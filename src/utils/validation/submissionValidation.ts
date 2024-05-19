// import { z } from "zod";

// // Definisikan skema untuk 'kerusakan'
// const kerusakanSchema = z.object({
//   rumah: z.number().int().nonnegative().optional(),
//   rumahTerendam: z.number().int().nonnegative().optional(),
//   fasilitasUmum: z.number().int().nonnegative().optional(),
// });

// // Definisikan skema untuk 'korban'
// const korbanSchema = z.object({
//   meninggal: z.number().int().nonnegative().optional(),
//   hilang: z.number().int().nonnegative().optional(),
//   terluka: z.number().int().nonnegative().optional(),
// });

// // Definisikan skema untuk 'pengungsian'
// const pengungsianSchema = z.object({
//   lokasiPengungsian: z.string().optional(),
//   tenda: z.number().int().nonnegative().optional(),
//   pengungsi: z.number().int().nonnegative().optional(),
// });

// // Definisikan skema untuk 'user'
// const userSchema = z.object({
//   email: z.string().email(),
//   fullname: z.string(),
// });

// // Definisikan skema utama untuk 'data'
// const SchemaSubmission = z.object({
//   user: userSchema,
//   namaPelapor: z
//     .string()
//     .min(1)
//     .max(50, { message: "Nama maksimal 50 karakter" }),
//   jenisBencana: z.enum(
//     [
//       "Banjir",
//       "Cuaca Ekstrem",
//       "Gempa Bumi",
//       "Longsor",
//       "Tsunami",
//       "Kebakaran",
//     ],
//     {
//       message: "Jenis bencana wajib diisi",
//     }
//   ),
//   tanggal: z.date({
//     message: "Tanggal wajib diisi dan harus berupa tanggal yang valid",
//   }),
//   daerah: z.string({ message: "Daerah wajib diisi" }),
//   lokasi: z.string({ message: "Lokasi wajib diisi" }).min(1).max(50),
//   penyebab: z.string({ message: "Penyebab wajib diisi" }).min(1).max(100),
//   image: z.string({ message: "Gambar wajib diisi" }),
//   kerusakan: kerusakanSchema,
//   korban: korbanSchema,
//   pengungsian: pengungsianSchema,
// });

// export default SchemaSubmission;
