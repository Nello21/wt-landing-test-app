import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen w-full flex justify-center p-[20px]">
            <div className="max-w-[1290px] w-full relative space-y-[20px]">
                <Image
                    src="/images/landing.png"
                    alt="Landing Image"
                    width={1290}
                    height={434}
                    className="pointer-events-none"
                />
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-dark text-[46px]">
                            2017
                        </span>
                        <span>Год начала работы</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-dark text-[46px]">
                            100+
                        </span>
                        <span>Восстановленных грузовиков Scania</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-dark text-[46px]">
                            7500+
                        </span>
                        <span>Довольных клиентов</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-dark text-[46px]">
                            11000+
                        </span>
                        <span>Оригинальных частей</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
