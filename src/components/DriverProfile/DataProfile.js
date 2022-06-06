/* eslint-disable camelcase */
import { getInfoDriverDetail } from 'actions/driver';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const renderRowData = (name, value) => (
  <div className="grid md:grid-cols-3 grid-cols-2 lg:w-[650px] md:w-[450px] w-full md:mb-4 mb-3 lg:mb-6  2xl:mb-8">
    <div className="md:col-span-2 col-span-1 text-xs md:text-sm ">{name}:</div>
    <div className="col-span-1 text-xs md:text-sm ">{value}</div>
  </div>
);
export default function DataProfile({ idDriver }) {
  const [dataProfile, setDataProfile] = useState();
  const { t } = useTranslation();

  const fetchDataDetailDriver = async () => {
    try {
      const response = await getInfoDriverDetail({ id: idDriver });
      const {
        data: { name, company_name, car_number, phone, city, region },
      } = response;
      setDataProfile([
        { title: t('driverDetail.name'), value: name },
        {
          title: t('driverDetail.companyName'),
          value: company_name,
        },
        {
          title: t('driverDetail.cartId'),
          value: car_number,
        },
        {
          title: t('driverDetail.phone'),
          value: phone,
        },
        {
          title: t('driverDetail.city'),
          value: city,
        },
        {
          title: t('driverDetail.region'),
          value: region,
        },
      ]);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    fetchDataDetailDriver();
  }, []);

  return (
    <div className="lg:pt-16 2xl:pt-12 xl:pt-10 md:pt-8 pt-6">
      {dataProfile?.map((item, index) => (
        <div key={index}>{renderRowData(item.title, item.value)}</div>
      ))}
    </div>
  );
}
