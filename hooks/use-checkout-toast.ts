import { useToast } from "@/hooks/use-toast"

export function useCheckoutToast() {
  const { toast } = useToast()

  const showSuccessToast = (deliveryInfo: { date: string; time: string; paymentMethod: string }) => {
    toast({
      title: "Đặt hàng thành công! 🎉",
      description: `Đơn hàng của bạn đã được xác nhận. Giao hàng: ${deliveryInfo.date} lúc ${deliveryInfo.time}. Thanh toán: ${deliveryInfo.paymentMethod}`,
      duration: 5000,
    })
  }

  const showErrorToast = (message: string) => {
    toast({
      title: "Có lỗi xảy ra",
      description: message,
      variant: "destructive",
      duration: 3000,
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}