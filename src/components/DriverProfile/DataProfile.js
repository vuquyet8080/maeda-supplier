/* eslint-disable camelcase */
import { getInfoDriverDetail } from 'actions/driver';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DataProfile({ idDriver }) {
  const [dataProfile, setDataProfile] = useState();
  const { t } = useTranslation();

  const renderRowData = (name, value) => (
    <div className="grid md:grid-cols-3 grid-cols-2 lg:w-[650px] md:w-[450px] w-full md:mb-4 mb-3 lg:mb-6  2xl:mb-8">
      <div className="md:col-span-2 col-span-1 text-xs md:text-sm ">{name}</div>
      <div className="col-span-1 text-xs md:text-sm ">{value}</div>
    </div>
  );

  const fetchDataDetailDriver = async () => {
    try {
      const response = await getInfoDriverDetail({ id: idDriver });
      const {
        data: { name, company_name, id_number, phone, city, region },
      } = response;
      setDataProfile([
        { title: 'name', value: name },
        {
          title: 'companyName',
          value: company_name,
        },
        {
          title: 'cartId',
          value: id_number,
        },
        {
          title: 'phone',
          value: phone,
        },
        {
          title: 'city',
          value: city,
        },
        {
          title: 'region',
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
        <div key={index}>{renderRowData(t(`driverDetail.${item.title}`), item.value)}</div>
      ))}
    </div>
  );
}
