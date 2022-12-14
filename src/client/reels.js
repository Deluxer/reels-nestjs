var url = 'http://localhost:3001/';

const checkSession = async() => {
    const auth = await fetch(`${ url }users/auth-status?token=`+localStorage.getItem('token'), {
        method: 'GET',
        headers: {
        }
    });
    
    const resp = await auth.json();
    return resp.status;
}

const showVideo = (videos) => {
    const reelList = document.querySelector('.video-list');
    
    videos.forEach( reel => {
        const list = '<div class="col-md-4 col-lg-4 col-sm-6 col-12 pb-4">'+
            '<div class="row">'+
                '<div class="col-7">'+
                    '<img src="'+ url +'reels/photo/'+ reel.urlImage +'" alt="Img" class="img-thumbnail" />' +
                '</div>'+
                '<div class="col-5 position-relative">'+
                    '<h6>'+ reel.title +'</h6>'+
                    '<a href="'+ url +'reels/videos/'+ reel.url +'" target="_blanck">watch video <i class="fa-sharp fa-solid fa-arrow-up-right-from-square"></i></a>'+
                    '<br/>'+
                    '<br/>'+
                    '<br/>'+
                    '<br/>'+
                    '<a href="#" class="position-absolute bottom-0 start-0 text-danger" onClick= onDelete(event) >delete</a>'+
                    '<input type="hidden" class="id_video" value="'+ reel._id +'">'+
                    
                '</div>'+ 
            '</div>'+
        '</div>';
        reelList.innerHTML += list;
    });

    const spin = '<div id="spin-reel" class="spinner-border" role="status">'+
            '<span class="visually-hidden">Loading...</span>'+
        '</div>';

    if(videos.length === 0) {
        reelList.innerHTML += spin;
    }
}

const getAllVideos = async() => {
    
    
    const authStatus = await checkSession();
    
    if(!authStatus) {
        window.location.href = `${ url }`;
    }    
    const token = localStorage.getItem('token');
    const userResp = await fetch(`${ url }reels`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    });
    
    const videos = await userResp.json();
    if(videos.length > 0)
    showVideo(videos);
}

getAllVideos();

const onClickUpload = async(event) => {
    const token = localStorage.getItem('token');
    const fileInput = document.querySelector('#file');
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    showVideo([]);

    const resp = await fetch(`${ url }reels/upload`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData
    });

    const video = await resp.json();
    showVideo([video]);

    const spinReel = document.querySelector('#spin-reel');
    spinReel.remove();
    
    Swal.fire('??File Uploades successfully!', '', 'success');

    return 
}
const logout = () => {
    localStorage.removeItem('token'); 
    window.location.href = `${ url }index.html`;
}

const onDelete = (event) => {
    const reel = event.target;
    reel.parentNode.parentNode.parentNode.remove();
    const id = reel.parentNode.querySelector('.id_video');
    
    const token = localStorage.getItem('token');
    
    fetch(`${ url }reels/${ id.value }`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });


}