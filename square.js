const getSqiareImageBlob = (file) => {
    return new Promise((resolve, reject) => {
        let URL = window.URL || window.webkitURL;
        let imgURL = URL.createObjectURL(file);
        let img = new Image();
        img.src = imgURL;
        img.onload = async () => {
            const canvas = document.createElement('canvas');

            let wh = 0; let dx = 0; let dy = 0;
            if (img.naturalHeight > img.naturalWidth) {
                wh = img.naturalWidth;
                dy = img.naturalHeight / 4;
            } else {
                wh = img.naturalHeight;
                dx = img.naturalWidth / 4;
            }

            canvas.height = wh;
            canvas.width = wh;

            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, dx, dy, wh, wh, 0, 0, wh, wh);
            const url = canvas.toDataURL('image/webp');

            resolve(await (await fetch(url)).blob())
        }
    })
}

document.getElementById("file").onchange = async (e) => {
    let files = e.target.files, file;
    if (files && files.length > 0) {
        file = files[0];
        if (file.size > 1024 * 1024 * 5) {
            alert("Max Size: 5m")
            return
        }

        let imageBlob = await getSqiareImageBlob(file);
        console.log(imageBlob)
    }
}