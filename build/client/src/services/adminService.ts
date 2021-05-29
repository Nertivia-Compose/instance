import wrapper from "./wrapper";

export function deleteEmoji(emojiID: string): Promise<any> {
  return wrapper()
    .delete(`settings/emoji`, {
      json: { emojiID }
    })
    .json();
}

export interface Stats {
  userCount: number
  serverCount: number
  messageCount: number
}
export function fetchStats(): Promise<Stats> {
  return wrapper()
    .get(`admin/stats`).json();
}
export interface ExpandedUser {
  avatar: string | null
  created: number
  email: string
  id: string
  ip: string
  tag: string
  username: string
  banner?: string
  banned?: boolean
  bot?: boolean
}
export function fetchRecentUsers(): Promise<ExpandedUser[]> {
  return wrapper()
    .get(`admin/users/recent`).json();
}
export function searchUsers(value: string): Promise<ExpandedUser[]> {
  return wrapper()
    .get(`admin/users/search/${encodeURIComponent(value)}`).json();
}
export function suspendUser(id: string, password: string, reason: string): Promise<any> {
  return wrapper()
    .post(`admin/users/${id}/suspend`, {json: {password, reason}}).json();
}
