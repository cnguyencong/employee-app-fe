import { from } from "rxjs";

export class Util {
  static localDateTimeToDate(localDateTime: number[]): Date {
    const year = localDateTime[0];
    const month = localDateTime[1];
    const day = localDateTime[2];
    return new Date(year, month - 1, day, 0, 0, 0);
  }

  static getFileNameFromFileUrl(fileUrl: string, includingFileType = true) {
    const lastSlashIndex = fileUrl.lastIndexOf('/');
    const fileNameWithExtension = fileUrl.substring(lastSlashIndex + 1);
    const dotIndex = fileNameWithExtension.lastIndexOf('.');
    const fileName = fileNameWithExtension.substring(0, dotIndex);
    const fileType = fileNameWithExtension.substring(dotIndex + 1);
    const name = `${fileName}${includingFileType ? `.${fileType}` : ''}`;
    return name;
  }

  static compareString(stringA: string, stringB: string) {
    return stringA?.toLowerCase().trim() == stringB?.toLowerCase().trim();
  }

  static dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  static decodeUTF8(data: string): string {
    const decoder = new TextDecoder('utf-8');
    const byteArray = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      byteArray[i] = data.charCodeAt(i) & 0xff;
    }
    return decoder.decode(byteArray);
  }

  static applyContractAndBrightnessToCanvas(
    canvas: HTMLCanvasElement,
    brightness: number,
    contrast: number
  ) {
    const context = canvas.getContext('2d');
    const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= brightness;
      data[i + 1] *= brightness;
      data[i + 2] *= brightness;

      data[i] = (data[i] - 128) * contrast + 128;
      data[i + 1] = (data[i + 1] - 128) * contrast + 128;
      data[i + 2] = (data[i + 2] - 128) * contrast + 128;
    }

    // Update the canvas with the modified image data
    context!.putImageData(imageData, 0, 0);
  }

  static resizeImg(imgData: string, wishingWidth: number): Promise<string> {
    const img = new Image();
    img.src = imgData;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Calculate the new height while maintaining the aspect ratio
        const aspectRatio = img.width / img.height;
        const newWidth = wishingWidth;
        const newHeight = newWidth / aspectRatio;

        // Create a temporary canvas to draw the resized image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;

        // Draw the resized image onto the temporary canvas
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) {
          return;
        }
        tempCtx.drawImage(img, 0, 0, newWidth, newHeight);
        // Get the resized image as a data URL

        return resolve(tempCanvas.toDataURL());
        // Use the resized image as needed (e.g., display it on the page, send it to the server, etc.)
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  }

  static loadImg(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  }

  static readSpectralFile(file: File, ext: string, info: any) {
    const reader = new FileReader()
    return from(new Promise((resolve, reject) => {
      reader.onload = (event) => {
        let content: any = event.target?.result;
        let divider: string;
        let fileType = 'text/plain';
        switch(ext) {
          case 'txt':
            content = content?.split('\r\n').map((c: string) => {
              return c.trim().replace(' ', '\t').split('\t');
            }).filter(([x, y]: any) => x && y);
            divider = '\t';
            fileType = 'text/plain';
            break;
          case 'csv':
            content = content?.split('\r\n').reduce((result: string[], c: string, index: number) => {
              if ([0,1].includes(index) || !c) {
                return result;
              }
              return [...result, c.trim().split(',')]
            }, []);
            divider = ',';
            fileType = 'text/csv';
            break;
          case 'jdx':
            // TODO
            break;
        }

        // normalize data
        const data: any = [];
        let xArr = content.map((value: string[]) => +value[0]);
        if (info.isWaveNumber) {
          xArr = xArr.map((x: number) => Math.pow(10, 7) / x);
        }
        
        let yArr = content.map((value: string[]) => +value[1]);
        if (info.isNormalizeY) {
          const maxY = Math.max(...yArr);
          if (maxY > 100) {
            yArr = yArr.map((y: number) => y / maxY);
          } else if (maxY >= 1 && maxY <= 100) {
            yArr = yArr.map((y: number) => y / 100);
          }
        }
        
        xArr.forEach((x: number, i: number) => {
          data.push([x, yArr[i]]);
        })

        const d = data.reduce((result: string, [x, y]: any) => result + x + divider + y + '\r\n', '');
        const normalizedFile = new File([d], file.name, { type: fileType });
        resolve({ normalizedFile, data });
      }
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    }));
  }

  static maipulateChart(data: any, amplitude: number, offset: number) {
    const yArr = data.map(({ y }: any) => y);
    const minY = +Math.min(...yArr);
    return data.map(({x, y}: any) => ({ x, y: +amplitude * (+y - minY) + minY + +offset }) );
  }

  static genKey(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
