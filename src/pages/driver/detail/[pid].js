import { Tab } from '@headlessui/react';
import DataProfile from 'components/DriverProfile/DataProfile';
import DataTableTransaction from 'components/DriverProfile/DataTableTransaction';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DriverDetail() {
  const categories = ['Profile', 'Transaction History'];
  const router = useRouter();
  const idDriver = router.query?.pid;
  console.log('idDriver', idDriver);

  return (
    <div className="w-full  md:pt-12  pt-6">
      <Tab.Group>
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
        <div className="pt-6 w-full">
          <Tab.Panels>
            <Tab.Panel className="px-5 md:px-10">
              <div className="text-2xl font-bold">Driver Portal</div>
              <DataProfile idDriver={idDriver} />
            </Tab.Panel>
            <Tab.Panel>
              <DataTableTransaction />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
