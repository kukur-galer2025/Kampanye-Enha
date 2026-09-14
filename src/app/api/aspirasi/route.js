import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kampanye_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, category, message, isAnonymous } = body;

    if (!category || !message) {
      return NextResponse.json({ error: 'Kategori dan Pesan wajib diisi' }, { status: 400 });
    }

    const finalName = isAnonymous ? 'Anonim' : (name || 'Anonim');

    const [result] = await pool.execute(
      'INSERT INTO Aspirasi (name, category, message, isAnonymous, createdAt) VALUES (?, ?, ?, ?, ?)',
      [finalName, category, message, isAnonymous ? 1 : 0, new Date()]
    );

    const aspirasi = {
      id: result.insertId,
      name: finalName,
      category,
      message,
      isAnonymous,
      createdAt: new Date().toISOString()
    };

    sendEmailNotification(aspirasi).catch(console.error);

    return NextResponse.json({ success: true, data: aspirasi }, { status: 201 });
  } catch (error) {
    console.error('Error saving aspirasi:', error);
    return NextResponse.json({ error: 'Gagal memproses aspirasi', details: error.message }, { status: 500 });
  }
}

async function sendEmailNotification(data) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    console.warn('SMTP_EMAIL atau SMTP_PASSWORD tidak disetel. Email tidak dikirim.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Sistem Kampanye Dekan" <${SMTP_EMAIL}>`,
      to: 'nurul@unsoed.ac.id',
      subject: `Aspirasi Baru: ${data.category}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #1e3a31;">Ada Aspirasi Baru Masuk!</h2>
          <p><strong>Pengirim:</strong> ${data.name} ${data.isAnonymous ? '(Anonim)' : ''}</p>
          <p><strong>Kategori:</strong> ${data.category}</p>
          <p><strong>Waktu:</strong> ${new Date(data.createdAt).toLocaleString('id-ID')}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="white-space: pre-wrap; font-size: 16px; color: #333;">${data.message}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <small style="color: #999;">Email ini dikirim otomatis oleh sistem Faculty Data Center.</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email terkirim!");
  } catch (err) {
    console.error("Gagal kirim email", err);
  }
}
