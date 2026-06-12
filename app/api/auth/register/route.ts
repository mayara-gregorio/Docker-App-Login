import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const {name, email, password} = await request.json();

    if(!name || !email || !password) {
        return NextResponse.json({message: "Ausência de parâmetros"}, {status: 400});
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return NextResponse.json({message: "Usuário já registrado"}, {status: 409});
    }

    const passHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: passHash
        }
    });

    return NextResponse.json({message: "Usuário registrado com sucesso"}, {status: 201});

}