function resize_handler(){
    window.addEventListener('resize', function(){
        space.camera.aspect = window.innerWidth/window.innerHeight
        space.camera.updateProjectionMatrix()
        space.renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)
}