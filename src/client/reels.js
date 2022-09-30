const checkSession = async() => {
    const auth = await fetch('http://localhost:3001/users/auth-status?token='+localStorage.getItem('token'), {
        method: 'GET',
        headers: {
        }
    });
    
    const resp = await auth.json();
    
    return resp.status;
}

const showVideo = (videos) => {
    const VideoList = document.querySelector('.video-list');
    videos.forEach( video => {

        const spin = '<div class="spinner-border" role="status">'+
            '<span class="visually-hidden">Loading...</span>'+
        '</div>';
        const img = '<img src="'+ video.urlImage +'" alt="" class="img-thumbnail" />';
        console.log(video.urlImage);
        const list = '<div class="col-md-4 col-lg-4 col-sm-6 col-12 pb-4">'+
            '<div class="row">'+
                '<div class="col-7">'+
                    '<img src="http://localhost:3001/reels/photo/'+ video.urlImage +'" alt="Img" class="img-thumbnail" />' +
                '</div>'+
                '<div class="col-5 position-relative">'+
                    '<h6>'+ video.title +'</h6>'+
                    '<a href="http://localhost:3001/reels/videos/'+ video.url +'" target="_blanck">watch video <i class="fa-sharp fa-solid fa-arrow-up-right-from-square"></i></a>'+
                    '<br/>'+
                    '<br/>'+
                    '<br/>'+
                    '<br/>'+
                    '<a href="#" class="position-absolute bottom-0 start-0 text-danger" onClick= onDelete(event) >delete</a>'+
                    '<input type="hidden" class="id_video" value="'+ video._id +'">'+
                    
                '</div>'+ 
            '</div>'+
        '</div>';

        VideoList.innerHTML += list;
    });

    
}

const getAllVideos = async() => {

    const authStatus = await checkSession();

    if(!authStatus) {
        window.location.href = 'http://localhost:3001';
    }    
    const token = localStorage.getItem('token');
    const userResp = await fetch('http://localhost:3001/reels', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    });

    const videos = await userResp.json();
    showVideo(videos);
}

getAllVideos();

const onClickUpload = async(event) => {
    const token = localStorage.getItem('token');
    const fileInput = document.querySelector('#file');
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const resp = await fetch('http://localhost:3001/reels/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData
    });
    const video = await resp.json();
    showVideo([video]);

    Swal.fire('¡File Uploades successfully!', '', 'success');

    return 
}
const logout = (event) => {
    localStorage.removeItem('token'); 
    window.location.href = 'http://localhost:3001/index.html';
}

const onDelete = (event) => {
    const reel = event.target;
    reel.parentNode.parentNode.parentNode.remove();
    const id = reel.parentNode.querySelector('.id_video');
    
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3001/reels/${ id.value }`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/json'
        },
    });


}