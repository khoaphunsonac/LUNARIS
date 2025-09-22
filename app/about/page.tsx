import Image from "next/image";
import { Shield, Heart, Leaf, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-balance">About Lunaris</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                        Khi thân mật trở thành nghệ thuật
                    </p>
                </div>

                {/* Hero Section */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-balance">Câu chuyện của chúng tôi</h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Tại Lunaris, chúng tôi tin rằng sự thân mật cần được nâng niu bằng những gì an toàn,
                                    tự nhiên và tinh tế nhất. Chính vì vậy, Lunaris lựa chọn tơ tằm – chất liệu gắn liền
                                    với sự mềm mại, bền chắc và gần gũi thiên nhiên – để tạo nên dòng bao cao su độc
                                    đáo, mang lại cảm giác chân thật và thoải mái.
                                </p>
                                <p>
                                    Không chỉ dừng ở chất liệu, chúng tôi chú trọng đến bền vững và trải nghiệm. Sản
                                    phẩm Lunaris có khả năng phân hủy sinh học, góp phần giảm gánh nặng cho môi trường.
                                    Bao bì được thiết kế tối giản, thanh lịch và kín đáo, giúp bạn hoàn toàn yên tâm khi
                                    lựa chọn và sử dụng, không còn cảm giác ngại ngùng.
                                </p>
                                <p>
                                    Song song với chất lượng, Lunaris còn mang đến dịch vụ tận tâm: giao hàng nhanh,
                                    đúng hẹn, bảo mật thông tin và đóng gói cẩn thận. Chúng tôi mong rằng mỗi trải
                                    nghiệm cùng Lunaris không chỉ là sự an toàn, mà còn là sự sang trọng và tinh tế.
                                </p>
                                <p className="font-medium text-primary">
                                    👉 Lunaris – Khi thân mật trở thành nghệ thuật
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden">
                            <Image
                                src="/images/decor2.png"
                                alt="LUNARIS Design Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Giá trị cốt lõi</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Những giá trị mà Lunaris luôn theo đuổi trong từng sản phẩm và dịch vụ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">An toàn</h3>
                                <p className="text-sm text-muted-foreground">Bảo vệ trọn vẹn sức khỏe và cảm xúc</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Tinh tế</h3>
                                <p className="text-sm text-muted-foreground">
                                    Thiết kế sang trọng, trải nghiệm đẳng cấp
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Leaf className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Bền vững</h3>
                                <p className="text-sm text-muted-foreground">
                                    Thân thiện môi trường, trách nhiệm với hành tinh
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Nhân văn</h3>
                                <p className="text-sm text-muted-foreground">Gắn kết cộng đồng, lan tỏa yêu thương</p>
                            </CardContent>
                        </Card>

                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">Đổi mới</h3>
                                <p className="text-sm text-muted-foreground">
                                    Tiên phong sáng tạo, nâng tầm trải nghiệm
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-4 text-primary">Sứ mệnh</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Nâng tầm trải nghiệm thân mật thông qua những sản phẩm an toàn, tự nhiên và tinh tế.
                                    Lunaris cam kết mang đến sự thoải mái, tin cậy và sang trọng cho mọi khoảnh khắc đặc
                                    biệt.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-4 text-primary">Tầm nhìn</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Trở thành thương hiệu hàng đầu trong lĩnh vực sản phẩm thân mật cao cấp, được tin
                                    tưởng bởi chất lượng vượt trội và dịch vụ tận tâm.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Product Features */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Đặc điểm nổi bật</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Những ưu điểm vượt trội của sản phẩm Lunaris
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Chất liệu tơ tằm tự nhiên</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Mềm mại, bền chắc và gần gũi với thiên nhiên, mang lại cảm giác chân thật nhất
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Leaf className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Phân hủy sinh học</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Thân thiện với môi trường, góp phần bảo vệ hành tinh xanh
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <Heart className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Bao bì kín đáo</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Thiết kế tối giản, thanh lịch, đảm bảo sự riêng tư tuyệt đối
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[300px] rounded-lg overflow-hidden">
                            <Image
                                src="/images/decor1.png"
                                alt="LUNARIS Quality"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="gradient-purple-pink-light rounded-lg p-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                            <div className="text-sm text-muted-foreground">Khách hàng tin tưởng</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">4</div>
                            <div className="text-sm text-muted-foreground">Dòng sản phẩm cao cấp</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                            <div className="text-sm text-muted-foreground">Đánh giá khách hàng</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary mb-2">24h</div>
                            <div className="text-sm text-muted-foreground">Giao hàng nhanh chóng</div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
