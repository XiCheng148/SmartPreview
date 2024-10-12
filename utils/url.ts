export function removeSmartPopupParam(url: string, removeAll = false): string {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  if (removeAll) {
    urlObj.search = '';
    return urlObj.toString();
  }
  // 移除 isSmartPopup 参数
  params.delete('isSmartPopup');

  // 重新设置 URL 的 search 部分
  urlObj.search = params.toString();

  return urlObj.toString();
}
