import toastr from "toastr";

export function alertMessage(alert) {
  if (alert.show) {
    const { message: { content } } = alert;
    switch (alert.message.type) {
      case "success":
        toastr.success(content);
        break;
      case "error":
        toastr.error(content);
        break;
      case "info":
        toastr.info(content);
        break;
      default:
        return false;
    }
  }
  return false;
}
