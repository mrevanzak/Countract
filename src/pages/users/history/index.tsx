import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';

import apiMock from '@/lib/axios-mock';
import { getISODatetoWIB } from '@/lib/date-time';
import logger from '@/lib/logger';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

import { HistoricalAccess, Status } from '@/types/item';

export default withAuth(HistoryPage, 'all');
function HistoryPage() {
  const { isLoading, isError, data, error, refetch } = useQuery<
    HistoricalAccess[],
    Error
  >('historicalAccessData', async () => {
    const { data } = await apiMock.get('/dokumen/riwayat');
    return data;
  });

  const verifyAccess = (type: number, id: number) => {
    logger({ id, type }, 'index.tsx line 25');
    const status = (() => {
      switch (type) {
        case Status.DITERIMA:
          return `terima`;
        case Status.DITOLAK:
          return `tolak`;
      }
    })();
    const url = `/dokumen/riwayat/` + status;

    toast.promise(
      apiMock.post(url, { id_riwayat: id }).then((res) => {
        logger(res);
        refetch();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Successfully change data',
        error: `Error: could not change the data`,
      }
    );
  };

  return (
    <Layout>
      <main>
        <section className='m-6'>
          <h3>Riwayat Akses Dokumen</h3>
          <div className='rounded-mdp-5 mt-3'>
            <div className='mt-8 flex flex-col'>
              <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                          >
                            Pengakses
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Dokumen
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Tanggal
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Detail
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : isError ? (
                          <div>{error.message}</div>
                        ) : (
                          data &&
                          data.map((item, itemIdx) => (
                            <tr key={itemIdx}>
                              <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                                {item.nama_pengakses}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {item.jenis_dokumen}
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {getISODatetoWIB(item.tanggal)} WIB
                              </td>
                              <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                {(() => {
                                  switch (item.status_diterima) {
                                    case 1:
                                      return (
                                        <p className='font-bold text-green-500'>
                                          Diterima
                                        </p>
                                      );
                                    case -1:
                                      return (
                                        <p className='font-bold text-red-500'>
                                          Ditolak
                                        </p>
                                      );
                                    case 0:
                                      return (
                                        <div className='flex space-x-2'>
                                          <button
                                            onClick={() =>
                                              verifyAccess(
                                                Status.DITERIMA,
                                                item.status_diterima
                                              )
                                            }
                                            className='inline-flex items-center rounded border border-transparent bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                          >
                                            Terima
                                          </button>
                                          <button
                                            onClick={() =>
                                              verifyAccess(
                                                Status.DITOLAK,
                                                item.status_diterima
                                              )
                                            }
                                            className='inline-flex items-center rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                                          >
                                            Tolak
                                          </button>
                                        </div>
                                      );
                                  }
                                })()}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </main>
    </Layout>
  );
}
