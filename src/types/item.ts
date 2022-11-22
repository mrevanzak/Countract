export type Item = {
  name: string;
  status: string;
  totalApplication: number;
  totalRequest: number;
};

export enum Status {
  DITERIMA = 1,
  PROSES = 0,
  DITOLAK = -1,
}

export type HistoricalAccess = {
  id_riwayat: number;
  nama_pengakses: string;
  jenis_dokumen: string;
  tanggal: string;
  status_diterima: Status;
};
