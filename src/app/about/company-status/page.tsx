import React from 'react';
import {AboutSubPageLayout} from '@/components/about/AboutSubPageLayout';
import '@/assets/styles/company-status.css';
export const metadata = {
  title: "회사 현황 | UBcare",
  description: "UBcare Company Status",
};

import companyStatusImg from "@/assets/images/company.png";
const companyStatusImgData = [
  {
    id: "UBcare",
    title: "UBcare",
    description: "회사 전경",
    imageUrl: companyStatusImg.src,
    href: "#",
  }
]

const companyPage: React.FC = () => {
  return (
    <AboutSubPageLayout
      pageTitle="회사 현황"
      subLabel="Company Status"
      headline={<>
        의료 데이터를 연결하는 플랫폼,<br />
        유비케어의 본사가 시작점입니다.
      </>}
    >
      <div className="company-status-page">
        <div className="company-status-page__content flex-col md:flex-row ">
          <div className="company-img">
            {companyStatusImgData.map((item, idx) => (
              <img
                key={idx}
                src={item.imageUrl}
                alt={item.title}
              />
            ))}
          </div>

          <div className="company-map-info">
            <div className="w-full h-[319px] overflow-hidden shadow-lg ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1543.854333272685!2d127.04033967777211!3d37.55685355472576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f026167ad41%3A0xce9ba62a7e5fa7b5!2zR0Prhbnsi63snpDsm7DruZk!5e0!3m2!1sko!2skr!4v1771572537786!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="유비케어 본사 위치"
              />
            </div>

            <div className="mt-4 p-4 bg-gray-50">
              <h3 className="font-semibold text-lg mb-1">유비케어 본사</h3>
              <p className="text-gray-600 mb-2">서울특별시 성동구 왕십리로 241 LF스퀘어</p>
              <a
                href="https://maps.google.com/maps?q=서울특별시+성동구+왕십리로+241+LF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                구글 지도에서 크게 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </AboutSubPageLayout>
  );
};

export default companyPage;