import { useGetIdentity, useGetList } from 'react-admin';

const useHasVendors = () => {
  const { data: user } = useGetIdentity();
  const { data: VendorList } = useGetList('vendor', { filter: { 'userId': user?.id } });

  return VendorList && VendorList.length > 0;
};

export default useHasVendors;