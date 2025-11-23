//TODO: gør email fancy med tailwind styling

'use server'

import { createClient } from '@/lib/client';
import { Resend } from 'resend';

type SendProps = {
    customerId: string;
    orderId: string;
    password: string;
    name: string;
    email: string;
    message: string;
    product: string;
}

export default async function send({ customerId, orderId, password, name, email, message, product }: SendProps) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    let emailtext = ""
    if (message !== "") {
        emailtext = `
            <div>
                <p>Din besked:</p>
                <blockquote>${message}</blockquote>
            </div>
        `
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Chresten <noreply@chrestensoelberg.dk>',
            to: email,
            subject: `Ordre: ${orderId} - ${product}`,
            html: `
                <h2>Hej ${name},</h2>
                <p>Tak for din bestilling af <strong>${product}</strong>!</p>
                <p>Du har ${customerId}.chrestensoelberg.dk til kommunikation, opdateringer m.m. Du kan logge ind med adgangskoden <strong>${password}</strong>. Den bliver lukket automatisk efter 2 år uden kommunikation eller køb.</p>
                ${emailtext}
                <p>Jeg vender snart tilbage med mere information.</p>
                <p>Venlig hilsen,<br>Chresten</p>
            `,
        })

        if (error) {
            console.error('Fejl ved afsendelse:', error);
            return { success: false, error };
        }

        console.log('Mail sendt:', data)
        return { success: true }
    } catch (err) {
        console.error('Serverfejl:', err)
        return { success: false, error: err }
    }
}
