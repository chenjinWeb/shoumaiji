//图片压缩
async function compressImg(blob, defaultConfig = {}) {
    let config = {
        w: 300,
        h: 300,
        sw: 0,
        sh: 0,
        dx: 0,
        dy: 0,
        quality: 1,
        type: blob.type || 'image/jpeg',
        inherit:false,//true w h 使用图片你的原始宽高
    }
    Object.assign(config,defaultConfig);
    let $canvas = document.createElement("canvas");
    $canvas.style.display = 'none';
    document.body.appendChild($canvas);
    config.start && config.start();
    let result = await readBlobAsDataURL(blob);
    let bold = await canvasToImg($canvas, result, config);
    config.end && config.end();
    document.body.removeChild($canvas);
    return bold;
}

function readBlobAsDataURL(blob) {
    return new Promise((resolve, reject) => {
        let a = new FileReader();
        a.onload = function (e) {
            resolve && resolve(e.target.result)
        };
        a.readAsDataURL(blob);
    })
}

function canvasToImg($canvas, result, config) {
    let canvas = $canvas.getContext('2d');
    let img = new Image();
    return new Promise((resolve, reject) => {
        img.onload = function () {
            let width = img.width;
            let height = img.height;
            if(config.inherit){
                config.w = width;
                config.h = height;
            }
            $canvas.width = config.w;
            $canvas.height = config.h;
            let isRotate = false;
            if (config.rotate) {
                isRotate = true;
                canvas.save();
                canvas.translate(config.w / 2, config.h / 2);
                canvas.rotate(config.rotate * 90 * Math.PI / 180);
            }
            if (width > height) {
                let w = width / (height / config.h);
                let dx = -(w - config.w) / 2;
                let dy = 0;
                if (isRotate) {
                    dx += -config.w / 2;
                    dy += -config.h / 2;
                }
                canvas.drawImage(img, 0, 0, width, height, dx, dy, w, config.h);
            } else {
                let h = height / (width / config.w);
                let dx = 0;
                let dy = -(h - config.h) / 2;
                if (isRotate) {
                    dx += -config.w / 2;
                    dy += -config.h / 2;
                }
                canvas.drawImage(img, 0, 0, width, height, dx, dy, config.w, h);
            }
            canvas.restore();
            let bold = dataURLtoBlob($canvas.toDataURL(config.type, config.quality));
            resolve && resolve(bold);
        };
        img.src = result;
    })
}

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

export default compressImg;
