import { Table } from '@mantine/core';
import toast from 'react-hot-toast';
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
    return data.data;
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
      }
    );
  };

  return (
    <Layout>
      <main>
        <section className='m-6'>
          <h3>Riwayat Akses Dokumen</h3>
          <div className='mt-3 rounded-md bg-white p-5'>
            <Table>
              <thead>
                <tr>
                  <th>Pengakses</th>
                  <th>Dokumen</th>
                  <th>Tanggal</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <div>Loading...</div>
                ) : isError ? (
                  <div>{error.message}</div>
                ) : (
                  data &&
                  data.map((item, itemIdx) => (
                    <tr key={itemIdx}>
                      <td>{item.nama_pengakses}</td>
                      <td>{item.jenis_dokumen}</td>
                      <td>{getISODatetoWIB(item.tanggal)} WIB</td>
                      <td>
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
                                        item.id_riwayat
                                      )
                                    }
                                    className='bg-green-500 px-4 py-2 text-white'
                                  >
                                    Terima
                                  </button>
                                  <button
                                    onClick={() =>
                                      verifyAccess(
                                        Status.DITOLAK,
                                        item.id_riwayat
                                      )
                                    }
                                    className='bg-red-500 px-4 py-2 text-white'
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
            </Table>
          </div>
        </section>
      </main>
    </Layout>
  );
}
