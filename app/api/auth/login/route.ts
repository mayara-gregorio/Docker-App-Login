import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    if (!email || !password) {
        return NextResponse.json({ message: "Ausência de parâmetros" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.senhaHash);

    if (!isPasswordValid) {
        return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    const response = NextResponse.json({ message: "Login realizado com sucesso", token: token }, { status: 200 });

    response.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/"
    })

    return response;
}