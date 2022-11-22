import { AccessedUser, DocumentUser } from '@/types/item';

export const accessedUser: AccessedUser[] = [
  {
    nama_pengakses: 'Shopee Pay',
    tanggal: '2022-04-23T18:25:43.511Z',
  },
  {
    nama_pengakses: 'Go Pay',
    tanggal: '2022-04-23T18:25:43.511Z',
  },
];

export const data: DocumentUser[] = [
  {
    id: 1,
    jenis_dokumen: 'Kartu Tanda Penduduk',
    verifikasi: 'Terverifikasi',
    pihak: 20,
    permohonan: 15,
    path: 'https://images.bisnis.com/posts/2022/05/23/1536098/ilustrasi-e-ktp-atau-ktp-elektronik.jpg',
  },
  {
    id: 2,
    jenis_dokumen: 'Surat Izin Mengemudi',
    verifikasi: 'Proses Verifikasi',
    pihak: 0,
    permohonan: 0,
    path: 'https://images.bisnis.com/posts/2022/05/23/1536098/ilustrasi-e-ktp-atau-ktp-elektronik.jpg',
  },
  {
    id: 3,
    jenis_dokumen: 'Kartu Tanda Penduduk',
    verifikasi: 'Tertolak',
    pihak: 0,
    permohonan: 0,
    path: 'https://images.bisnis.com/posts/2022/05/23/1536098/ilustrasi-e-ktp-atau-ktp-elektronik.jpg',
  },
];
