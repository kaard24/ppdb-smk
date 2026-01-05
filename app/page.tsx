import Link from "next/link";
import { ArrowRight, BookOpen, Users, CreditCard, Monitor, Code, Wrench, Trophy, Sparkles } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col pt-20">
            {/* Hero Section */}
            <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-float" />
                <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }} />

                <div className="container mx-auto max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-semibold mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        <span>Pendaftaran 2025/2026 Dibuka</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 animate-slide-up leading-[1.1]">
                        Masa Depanmu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">Dimulai Di Sini</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        SMK Al-Hidayah Lestari mencetak talenta digital dan vokasi siap kerja dengan kurikulum berstandar industri internasional.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link
                            href="/daftar"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
                        >
                            Daftar Sekarang
                        </Link>
                        <Link
                            href="/jurusan"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-50 transition-all hover:border-gray-300"
                        >
                            Lihat Jurusan
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="px-6 py-20 bg-gray-50/50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Kenapa Memilih Kami?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                        {/* Main Feature - Large */}
                        <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                            <div>
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                    <Monitor className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">Fasilitas Modern & Terlengkap</h3>
                                <p className="text-gray-500 text-lg">Laboratorium komputer spek tinggi, bengkel standar industri, dan ruang kelas ber-AC dengan smart projector untuk menunjang pembelajaran praktikal.</p>
                            </div>
                            <div className="mt-8 flex gap-2">
                                <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-sm font-medium text-gray-600">iMac Lab</span>
                                <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-sm font-medium text-gray-600">Cisco Network</span>
                            </div>
                        </div>

                        {/* Secondary Feature */}
                        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-primary/30 transition-colors">
                            <Trophy className="w-10 h-10 text-secondary mb-4" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Akreditasi A</h3>
                                <p className="text-sm text-gray-500">Terakreditasi unggul oleh BAN-S/M dengan nilai 98.</p>
                            </div>
                        </div>

                        {/* Third Feature */}
                        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-primary/30 transition-colors">
                            <Users className="w-10 h-10 text-blue-500 mb-4" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Guru Praktisi</h3>
                                <p className="text-sm text-gray-500">Diajar langsung oleh praktisi industri berpengalaman.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Jurusan Section - Horizontal Scroll Snap on Mobile */}
            <section className="px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Program Keahlian</h2>
                            <p className="text-gray-500">Pilih masa depanmu dari sekarang</p>
                        </div>
                        <Link href="/jurusan" className="hidden md:flex items-center text-primary font-semibold hover:gap-2 transition-all">
                            Lihat Semua <ArrowRight className="w-5 h-5 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                code: "TKJ",
                                name: "Teknik Komputer & Jaringan",
                                icon: <Monitor className="h-6 w-6" />,
                                desc: "Cloud Computing, Network Security, & IoT.",
                                color: "text-blue-600",
                                bg: "bg-blue-50"
                            },
                            {
                                code: "RPL",
                                name: "Rekayasa Perangkat Lunak",
                                icon: <Code className="h-6 w-6" />,
                                desc: "Fullstack Web Dev, Android/iOS Apps, & AI.",
                                color: "text-primary",
                                bg: "bg-primary/10"
                            },
                            {
                                code: "TSM",
                                name: "Teknik Sepeda Motor",
                                icon: <Wrench className="h-6 w-6" />,
                                desc: "Mesin Injeksi, Motor Listrik, & Bisnis Bengkel.",
                                color: "text-orange-600",
                                bg: "bg-orange-50"
                            },
                        ].map((jurusan, idx) => (
                            <div key={idx} className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer overflow-hidden">
                                <div className={`absolute top-0 right-0 w-32 h-32 ${jurusan.bg} rounded-bl-full opacity-50`} />

                                <div className={`w-14 h-14 ${jurusan.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                    <div className={jurusan.color}>{jurusan.icon}</div>
                                </div>

                                <h3 className="text-xl font-bold mb-3">{jurusan.name}</h3>
                                <p className="text-gray-500 mb-6">{jurusan.desc}</p>

                                <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                    Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20">
                <div className="container mx-auto max-w-5xl">
                    <div className="relative rounded-[2.5rem] bg-gray-900 px-6 py-16 md:px-16 overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-gray-900 to-gray-900" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Siap Menjadi Ahli?</h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Kuota pendaftaran terbatas setiap tahunnya. Amankan kursimu sekarang dan jadilah bagian dari revolusi industri 4.0.</p>

                            <Link
                                href="/daftar"
                                className="inline-flex px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-colors"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
