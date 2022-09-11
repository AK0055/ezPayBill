import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/callback') {
        return NextResponse.redirect('/')
    }
    return NextResponse.next()
}