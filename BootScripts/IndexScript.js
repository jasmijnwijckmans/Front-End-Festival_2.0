var ImageFes = 1;

function NextImage() {
    if (ImageFes == 4) {
        ImageFes = 1;
    } else {
        ImageFes++;
    }
    switch (ImageFes) {
        case 1:
            document.getElementById("Image").src = "https://upload.wikimedia.org/wikipedia/commons/8/82/Tomorrowland-2017-2.jpg";
            break;
        case 2:
            document.getElementById("Image").src = "https://i.imgur.com/DBBlCi6.jpg";
            break;
        case 3:
            document.getElementById("Image").src = "https://lh3.ggpht.com/OECOG5x8irpAzTmdREBCOn8ZnqT2s8J8URU6SyONP1-rUWtDHN2dCcGsSgDL0OjNK18P=h900";
            break;
        case 4:
            document.getElementById("Image").src = "https://tse4.mm.bing.net/th/id/OIP.C7a_QvJESeHmycTJrL5m3AHaEi?pid=ImgDet&rs=1";
            break;
    }
}

