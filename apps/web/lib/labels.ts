export const alertLevelLabel = (level: string) => {
  const map: Record<string, string> = {
    Normal: "正常",
    Watch: "关注",
    Caution: "警戒",
  };
  return map[level] || level;
};

export const reportStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    Published: "已发布",
    Draft: "草稿",
    "In Review": "审阅中",
  };
  return map[status] || status;
};

export const logStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    Success: "成功",
    Warning: "警告",
  };
  return map[status] || status;
};
