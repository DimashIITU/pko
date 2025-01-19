// app/api/accounts/route.ts
import { getAccounts } from '@/app/actions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Обновляем все аккаунты, добавляя значения для новых полей
    const accounts = await getAccounts()
    
    // Возвращаем успешный ответ с обновленными данными
    return NextResponse.json({ success: true, accounts });
  } catch (error) {
    console.error('Error updating accounts:', error);
    return NextResponse.json(
      { error: 'Failed to update accounts' },
      { status: 500 }
    );
  }
}
