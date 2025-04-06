const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("download");

uploadInput.addEventListener("change", function () {
  const file = uploadInput.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = function () {
    // احذف محتوى الكانفاس القديم
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // حساب نسبة التصغير
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    // وضع الصورة في الوسط
    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;

    ctx.drawImage(img, x, y, newWidth, newHeight);
  };

  img.src = URL.createObjectURL(file);
});

downloadBtn.addEventListener("click", function () {
  const link = document.createElement("a");
  link.download = "resized-logo.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
