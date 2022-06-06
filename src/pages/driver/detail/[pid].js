import { Tab } from '@headlessui/react';
import DataProfile from 'components/DriverProfile/DataProfile';
import DataTableTransaction from 'components/DriverProfile/DataTableTransaction';
import { HEADER_SCROLL_SPACE } from 'constants/screen';
import { useTableHeight } from 'hooks/useTableHeight';
import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DriverDetail() {
  const { t } = useTranslation();

  const categories = [t('driverDetail.profile'), t('driverDetail.transactionHistory')];
  const router = useRouter();
  const idDriver = router.query?.pid;
  const [clientHeight, setClientHeight] = useState(0);
  const refHeader = useRef(null);

  useEffect(() => {
    setClientHeight(refHeader.current.clientHeight + HEADER_SCROLL_SPACE);
  }, []);
  const { tableHeight } = useTableHeight(clientHeight);

  return (
    <div className="w-full">
      <Tab.Group>
        <div ref={refHeader} className="md:pt-12 py-6">
          <Tab.List className="flex rounded-xl gap-x-5  px-5 md:px-10">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'md:px-6 px-4 md:rounded-[50px] rounded-[40px]  md:py-4 py-3  text-sm font-normal',
                    ' ',
                    selected
                      ? 'shadow text-white bg-primary-red'
                      : 'hover:bg-white/[0.12] md:border-2 border border-primary-red md:py-[12px] py-[11px] md:px-[22px] px-[15px]'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <div className=" w-full">
          <Tab.Panels>
            <Tab.Panel className="px-5 md:px-10">
              <div className="text-2xl font-bold">{t('driverDetail.driverPortal')}</div>
              <DataProfile idDriver={idDriver} />
            </Tab.Panel>
            <Tab.Panel>
              <DataTableTransaction
                idDriver={idDriver}
                fixedHeaderScrollHeight={`${tableHeight}px`}
              />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
