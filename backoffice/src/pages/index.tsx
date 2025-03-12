'use client';

import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      router.push(`/admin/dashboard`);
    } else {
      router.push(`/login`);
    }
 }, []);
}
