/** แปลสถานะตลาดจาก Yahoo เป็นภาษาไทย */
export function marketStateLabel(state: string): string {
  const map: Record<string, string> = {
    PREPRE: "ก่อนเปิดตลาด (เช้า)",
    PRE: "ก่อนเปิดตลาด",
    REGULAR: "เปิดตลาด",
    POST: "หลังปิดตลาด",
    POSTPOST: "หลังปิดตลาด (ดึก)",
    CLOSED: "NAV รายวัน",
    UNKNOWN: "ไม่ทราบสถานะ",
  };
  return map[state] ?? state;
}
