export type AccessedUser = {
  nama_pengakses: string;
  tanggal: string;
};

export type DocumentUser = {
  id: number;
  jenis_dokumen: string;
  verifikasi: 'Terverifikasi' | 'Tertolak' | 'Proses Verifikasi';
  pihak: number;
  permohonan: number;
  path: string;
};

export interface DetailDocumentUser extends DocumentUser {
  pihak_berakses: AccessedUser[];
}

export enum Status {
  DITERIMA = 1,
  PROSES = 0,
  DITOLAK = -1,
}

export type HistoricalAccess = {
  nama_pengakses: string;
  jenis_dokumen: string;
  tanggal: string;
  status_diterima: Status;
};
