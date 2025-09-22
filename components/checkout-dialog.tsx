"use client";

import { useState } from "react";
import { format, addHours } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar, Clock, CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/data-manager";
import { useCheckoutToast } from "@/hooks/use-checkout-toast";

interface CheckoutDialogProps {
    total: number;
    onCheckoutComplete: () => void;
    children: React.ReactNode;
}

type PaymentMethod = "cash" | "vnpay" | "card";

interface CustomerInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    deliveryDate: string;
    deliveryTime: string;
}

export function CheckoutDialog({ total, onCheckoutComplete, children }: CheckoutDialogProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"info" | "payment" | "processing" | "complete">("info");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const { showSuccessToast } = useCheckoutToast();
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
        deliveryDate: "",
        deliveryTime: "",
    });
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    });

    // Tính toán thời gian tối thiểu cho giao hàng (sau 2 tiếng)
    const minDeliveryDateTime = addHours(new Date(), 2);
    const minDeliveryDate = format(minDeliveryDateTime, "yyyy-MM-dd");
    const minDeliveryTime = format(minDeliveryDateTime, "HH:mm");

    const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
        setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleCardInfoChange = (field: keyof typeof cardInfo, value: string) => {
        let formattedValue = value;

        // Format card number với spaces
        if (field === "cardNumber") {
            formattedValue = value
                .replace(/\s/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim();
            if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
        }

        // Format expiry date
        if (field === "expiryDate") {
            formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
            if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
        }

        // Limit CVV to 3 digits
        if (field === "cvv") {
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        // Convert card name to uppercase
        if (field === "cardName") {
            formattedValue = value.toUpperCase();
        }

        setCardInfo((prev) => ({ ...prev, [field]: formattedValue }));
    };

    const isCustomerInfoValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        return (
            customerInfo.fullName.trim().length >= 2 &&
            phoneRegex.test(customerInfo.phone) &&
            emailRegex.test(customerInfo.email) &&
            customerInfo.address.trim().length >= 10 &&
            customerInfo.deliveryDate !== "" &&
            customerInfo.deliveryTime !== ""
        );
    };

    const isCardInfoValid = () => {
        const cardNumberClean = cardInfo.cardNumber.replace(/\s/g, "");
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

        return (
            cardNumberClean.length === 16 &&
            cardInfo.cardName.trim().length >= 2 &&
            expiryRegex.test(cardInfo.expiryDate) &&
            cardInfo.cvv.length === 3
        );
    };

    const handleContinueToPayment = () => {
        if (isCustomerInfoValid()) {
            setPaymentSuccess(false); // Reset payment success state
            setIsProcessingPayment(false); // Reset processing state
            setStep("payment");
        }
    };

    const simulateVNPayPayment = async () => {
        setIsProcessingPayment(true);
        // Giả lập quá trình quét QR và thanh toán VNPay
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setPaymentSuccess(true);
        setIsProcessingPayment(false);
    };

    const simulateCardPayment = async () => {
        setIsProcessingPayment(true);
        // Giả lập quá trình xử lý thẻ ngân hàng
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setPaymentSuccess(true);
        setIsProcessingPayment(false);
    };

    const handlePayment = async () => {
        if (paymentMethod === "card" && !isCardInfoValid()) {
            return;
        }

        setStep("processing");

        // Giả lập quá trình thanh toán
        if (paymentMethod === "vnpay") {
            await simulateVNPayPayment();
        } else if (paymentMethod === "card") {
            await simulateCardPayment();
        } else {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setPaymentSuccess(true);
        }

        setStep("complete");

        // Hiển thị toast thông báo thành công
        const paymentMethodText =
            paymentMethod === "cash" ? "Tiền mặt" : paymentMethod === "vnpay" ? "VNPay" : "Thẻ ngân hàng";

        showSuccessToast({
            date: customerInfo.deliveryDate,
            time: customerInfo.deliveryTime,
            paymentMethod: paymentMethodText,
        });

        // Tự động đóng dialog và hoàn tất checkout sau 3 giây
        setTimeout(() => {
            setOpen(false);
            onCheckoutComplete();
            // Reset form
            setStep("info");
            setPaymentSuccess(false);
            setIsProcessingPayment(false);
            setCustomerInfo({
                fullName: "",
                phone: "",
                email: "",
                address: "",
                notes: "",
                deliveryDate: "",
                deliveryTime: "",
            });
            setCardInfo({
                cardNumber: "",
                cardName: "",
                expiryDate: "",
                cvv: "",
            });
        }, 3000);
    };

    const renderCustomerInfoStep = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Thông tin khách hàng
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="fullName">Họ và tên *</Label>
                        <Input
                            id="fullName"
                            value={customerInfo.fullName}
                            onChange={(e) => handleCustomerInfoChange("fullName", e.target.value)}
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                            id="phone"
                            value={customerInfo.phone}
                            onChange={(e) => {
                                // Chỉ cho phép số và format
                                const phoneValue = e.target.value.replace(/\D/g, "").slice(0, 10);
                                handleCustomerInfoChange("phone", phoneValue);
                            }}
                            placeholder="0123456789"
                            maxLength={10}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange("email", e.target.value)}
                        placeholder="Nhập địa chỉ email"
                    />
                </div>

                <div>
                    <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                    <Textarea
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => handleCustomerInfoChange("address", e.target.value)}
                        placeholder="Nhập địa chỉ đầy đủ"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="deliveryDate">Ngày giao hàng *</Label>
                        <Input
                            id="deliveryDate"
                            type="date"
                            value={customerInfo.deliveryDate}
                            onChange={(e) => handleCustomerInfoChange("deliveryDate", e.target.value)}
                            min={minDeliveryDate}
                        />
                    </div>
                    <div>
                        <Label htmlFor="deliveryTime">Giờ giao hàng *</Label>
                        <Input
                            id="deliveryTime"
                            type="time"
                            value={customerInfo.deliveryTime}
                            onChange={(e) => handleCustomerInfoChange("deliveryTime", e.target.value)}
                            min={customerInfo.deliveryDate === minDeliveryDate ? minDeliveryTime : "00:00"}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                    <Textarea
                        id="notes"
                        value={customerInfo.notes}
                        onChange={(e) => handleCustomerInfoChange("notes", e.target.value)}
                        placeholder="Ghi chú thêm cho đơn hàng"
                        rows={2}
                    />
                </div>

                <div className="bg-muted p-3 rounded-md text-sm">
                    <p className="text-muted-foreground">
                        <strong>Lưu ý:</strong> Thời gian giao hàng tối thiểu là 2 tiếng kể từ khi đặt hàng.
                    </p>
                </div>

                {!isCustomerInfoValid() &&
                    (customerInfo.fullName || customerInfo.phone || customerInfo.email || customerInfo.address) && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded-md text-sm">
                            <p className="text-red-800">
                                <strong>Vui lòng kiểm tra:</strong>
                            </p>
                            <ul className="text-red-700 mt-1 space-y-1">
                                {customerInfo.fullName.trim().length < 2 && customerInfo.fullName && (
                                    <li>• Họ tên phải có ít nhất 2 ký tự</li>
                                )}
                                {!/^[0-9]{10}$/.test(customerInfo.phone) && customerInfo.phone && (
                                    <li>• Số điện thoại phải có đúng 10 chữ số</li>
                                )}
                                {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email) && customerInfo.email && (
                                    <li>• Email không đúng định dạng</li>
                                )}
                                {customerInfo.address.trim().length < 10 && customerInfo.address && (
                                    <li>• Địa chỉ phải có ít nhất 10 ký tự</li>
                                )}
                            </ul>
                        </div>
                    )}
            </div>

            <Separator />

            <div className="flex justify-between items-center">
                <div>
                    <span className="text-lg font-semibold">Tổng thanh toán: </span>
                    <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                </div>
                <Button onClick={handleContinueToPayment} disabled={!isCustomerInfoValid()} size="lg">
                    Tiếp tục thanh toán
                </Button>
            </div>
        </div>
    );

    const renderVNPayStep = () => (
        <div className="text-center space-y-4">
            {!paymentSuccess ? (
                <>
                    <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <Smartphone className="h-12 w-12 mx-auto mb-2 text-primary" />
                            <p className="text-sm text-muted-foreground">QR Code VNPay</p>
                            <p className="text-xs text-muted-foreground mt-2">(Demo)</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">Quét mã để thanh toán</p>
                        <p className="text-sm text-muted-foreground">
                            Mở ứng dụng VNPay và quét mã QR để hoàn tất thanh toán
                        </p>
                        <Badge variant="secondary" className="text-xs">
                            Số tiền: {formatPrice(total)}
                        </Badge>
                    </div>
                    <Button
                        onClick={simulateVNPayPayment}
                        disabled={isProcessingPayment}
                        className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    >
                        {isProcessingPayment ? (
                            <>
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                                Đang xử lý...
                            </>
                        ) : (
                            "Giả lập thanh toán VNPay"
                        )}
                    </Button>
                </>
            ) : (
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-green-600">Thanh toán VNPay thành công!</p>
                        <p className="text-sm text-muted-foreground">Giao dịch đã được xử lý thành công qua VNPay</p>
                        <div className="bg-green-50 border border-green-200 p-3 rounded-md text-sm">
                            <p className="text-green-800">
                                <strong>Phương thức:</strong> VNPay QR Code
                            </p>
                            <p className="text-green-800">
                                <strong>Số tiền:</strong> {formatPrice(total)}
                            </p>
                            <p className="text-green-800 text-xs mt-2">
                                Mã giao dịch: VNP{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderCardStep = () => (
        <div className="space-y-4">
            {!paymentSuccess ? (
                <>
                    <h4 className="font-medium flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Thông tin thẻ ngân hàng
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="cardNumber">Số thẻ *</Label>
                            <Input
                                id="cardNumber"
                                value={cardInfo.cardNumber}
                                onChange={(e) => handleCardInfoChange("cardNumber", e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                            />
                        </div>
                        <div>
                            <Label htmlFor="cardName">Tên chủ thẻ *</Label>
                            <Input
                                id="cardName"
                                value={cardInfo.cardName}
                                onChange={(e) => handleCardInfoChange("cardName", e.target.value)}
                                placeholder="NGUYEN VAN A"
                                style={{ textTransform: "uppercase" }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="expiryDate">Ngày hết hạn *</Label>
                                <Input
                                    id="expiryDate"
                                    value={cardInfo.expiryDate}
                                    onChange={(e) => handleCardInfoChange("expiryDate", e.target.value)}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <Label htmlFor="cvv">CVV *</Label>
                                <Input
                                    id="cvv"
                                    value={cardInfo.cvv}
                                    onChange={(e) => handleCardInfoChange("cvv", e.target.value)}
                                    placeholder="123"
                                    maxLength={3}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm">
                        <p className="text-yellow-800">
                            <strong>Demo:</strong> Đây là tính năng demo. Thông tin thẻ sẽ không được xử lý thực tế.
                        </p>
                    </div>
                    {isCardInfoValid() && (
                        <Button
                            onClick={simulateCardPayment}
                            disabled={isProcessingPayment}
                            className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                        >
                            {isProcessingPayment ? (
                                <>
                                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                                    Đang xử lý thẻ...
                                </>
                            ) : (
                                "Giả lập thanh toán thẻ"
                            )}
                        </Button>
                    )}
                </>
            ) : (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-green-600">Thanh toán thẻ thành công!</p>
                        <p className="text-sm text-muted-foreground">Giao dịch đã được xử lý thành công</p>
                        <div className="bg-green-50 border border-green-200 p-3 rounded-md text-sm">
                            <p className="text-green-800">
                                <strong>Thẻ:</strong> ****{cardInfo.cardNumber.replace(/\s/g, "").slice(-4)}
                            </p>
                            <p className="text-green-800">
                                <strong>Chủ thẻ:</strong> {cardInfo.cardName}
                            </p>
                            <p className="text-green-800">
                                <strong>Số tiền:</strong> {formatPrice(total)}
                            </p>
                            <p className="text-green-800 text-xs mt-2">
                                Mã giao dịch: TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderPaymentStep = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Chọn phương thức thanh toán</h3>

            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="space-y-4">
                    <Card
                        className={`cursor-pointer border-2 ${
                            paymentMethod === "cash" ? "border-primary" : "border-border"
                        }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash" id="cash" />
                                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                                    <Banknote className="h-4 w-4" />
                                    Thanh toán tiền mặt khi nhận hàng
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer border-2 ${
                            paymentMethod === "vnpay" ? "border-primary" : "border-border"
                        }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="vnpay" id="vnpay" />
                                <Label htmlFor="vnpay" className="flex items-center gap-2 cursor-pointer">
                                    <Smartphone className="h-4 w-4" />
                                    Thanh toán VNPay (Demo)
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className={`cursor-pointer border-2 ${
                            paymentMethod === "card" ? "border-primary" : "border-border"
                        }`}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                    <CreditCard className="h-4 w-4" />
                                    Thanh toán bằng thẻ ngân hàng (Demo)
                                </Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </RadioGroup>

            {paymentMethod === "vnpay" && renderVNPayStep()}
            {paymentMethod === "card" && renderCardStep()}

            <Separator />

            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={() => {
                        setStep("info");
                        setPaymentSuccess(false); // Reset payment success when going back
                        setIsProcessingPayment(false); // Reset processing state
                    }}
                >
                    Quay lại
                </Button>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="text-lg font-semibold">Tổng: </span>
                        <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
                    </div>
                    {(paymentMethod === "cash" || paymentSuccess) && (
                        <Button onClick={handlePayment} size="lg">
                            {paymentMethod === "cash" ? "Đặt hàng" : "Hoàn tất thanh toán"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderProcessingStep = () => (
        <div className="text-center space-y-4 py-8">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <h3 className="text-lg font-semibold">Đang xử lý...</h3>
            <p className="text-muted-foreground">
                {paymentMethod === "cash" ? "Đang xác nhận đơn hàng của bạn" : "Đang xử lý thanh toán"}
            </p>
        </div>
    );

    const renderCompleteStep = () => (
        <div className="text-center space-y-4 py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold text-green-600">Đặt hàng thành công!</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
                <p>Đơn hàng của bạn đã được xác nhận</p>
                <p>
                    Thời gian giao hàng: {customerInfo.deliveryDate} lúc {customerInfo.deliveryTime}
                </p>
                <p>
                    Phương thức thanh toán:{" "}
                    {paymentMethod === "cash" ? "Tiền mặt" : paymentMethod === "vnpay" ? "VNPay" : "Thẻ ngân hàng"}
                </p>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {step === "info" && "Thông tin đặt hàng"}
                        {step === "payment" && "Thanh toán"}
                        {step === "processing" && "Xử lý thanh toán"}
                        {step === "complete" && "Hoàn tất"}
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    {step === "info" && renderCustomerInfoStep()}
                    {step === "payment" && renderPaymentStep()}
                    {step === "processing" && renderProcessingStep()}
                    {step === "complete" && renderCompleteStep()}
                </div>
            </DialogContent>
        </Dialog>
    );
}
