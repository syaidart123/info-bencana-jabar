import Image from "next/image";
import Link from "next/link";
import React from "react";

const Partners = [
  {
    id: 1,
    name: "Al-Hilal",
    image: "/images/lembagaPartners/alhilal.png",
    link: "https://alhilal.or.id",
  },
  {
    id: 2,
    name: "dompetDhuafa",
    image: "/images/lembagaPartners/dompetdhuafa.png",
    link: "https://digital.dompetdhuafa.org",
  },
  {
    id: 3,
    name: "DT Peduli",
    image: "/images/lembagaPartners/dtpeduli.png",
    link: "https://dtpeduli.org",
  },
  {
    id: 4,
    name: "HI",
    image: "/images/lembagaPartners/HI.png",
    link: "https://human-initiative.org",
  },
  {
    id: 5,
    name: "IZI",
    image: "/images/lembagaPartners/IZI.png",
    link: "https://izi.or.id",
  },
  {
    id: 6,
    name: "MDMC",
    image: "/images/lembagaPartners/mdmc.png",
    link: "https://mdmc.or.id",
  },
  {
    id: 7,
    name: "Relawan Nusantara",
    image: "/images/lembagaPartners/RelawanNusantara.png",
    link: "https://relawannusantara.org",
  },
  {
    id: 8,
    name: "Rumah Zakat",
    image: "/images/lembagaPartners/RumahZakat.png",
    link: "https://www.rumahzakat.org",
  },
];

const AboutSection = () => {
  return (
    <section className="min-h-screen">
      <div className="mb-24 flex h-1/2 flex-col items-center justify-center bg-primary p-20">
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <p className="my-5 inline-block bg-gradient-to-l from-secondary to-secondary bg-clip-text text-3xl font-bold text-transparent">
            Tentang Kami
          </p>
        </div>
        <div className="text-justify text-white md:mx-14 md:text-center lg:mx-52 lg:text-lg">
          <p>
            Info Bencana JABAR adalah platform kolaboratif yang menghimpun
            berbagai lembaga kemanusiaan di Jawa Barat. Kami berdedikasi untuk
            mengurangi dampak bencana melalui kerjasama yang erat, memastikan
            setiap bantuan tersalurkan dengan cepat dan tepat kepada mereka yang
            paling membutuhkan. Dengan dukungan dan koordinasi dari berbagai
            pihak, kami bertujuan untuk memberikan respons yang efektif dan
            efisien dalam situasi darurat, sehingga bantuan dapat mencapai
            korban bencana tepat pada waktunya dan sesuai dengan kebutuhan
            mereka.
          </p>
        </div>
      </div>
      <div className="mb-10 flex h-1/2 flex-col items-center justify-center">
        <div className="flex items-center justify-center lg:items-start lg:justify-start">
          <p className="my-5 inline-block bg-gradient-to-l from-secondary to-primary bg-clip-text text-3xl font-bold text-transparent">
            Lembaga Partners:
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {Partners.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              className="flex items-center justify-center p-5"
            >
              <Image
                src={item.image}
                loading="lazy"
                width={500}
                height={500}
                alt={item.name}
                className="h-20 w-auto cursor-pointer rounded-lg bg-white p-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
