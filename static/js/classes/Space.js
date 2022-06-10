export default class Space {
    constructor(){
        this.scene = new THREE.Scene() 
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000)
        this.renderer = new THREE.WebGLRenderer()
        
        this.board;
        this.intersects = null;
        this.view = null;

        this.chosen_card = null;
        this.player_grid = null; //this.board.grid_display.slice(14, 28) //players whole grid with 14 positions
        
        //stats, and a little description of the chosen card
        this.description_display = this.create_description_display()
        this.currently_displayed_card = null;

        this.init()
        //this.create_icons()
        //this.create_axes()
    }

    init(){
        this.camera.position.set(0,1200,0)
        this.camera.lookAt(this.scene.position)

        this.renderer.setClearColor(0x2a2a3d)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        root.append(this.renderer.domElement)
        
        this.click_handling()
        this.card_moving() //card placement function also invoked here 
        this.view_swapping()
        this.context_menu_display_card_info()
    }

    //B and T buttons
    view_swapping(){
        let _this = this
        window.addEventListener('keydown', function(e){
            console.log(e.code)
            if(e.code == "KeyT" && _this.view == 'tactical'){
                _this.default_view()
            }
            else if(e.code == "KeyB" && _this.view == 'battlefield'){
                _this.default_view()
            }
            else if(e.code == "KeyT"){
                _this.tactical_view()
            }
            else if(e.code == "KeyB"){
                _this.battlefield_view()
            }
        })
    }

    default_view(){
        this.camera.position.set(0,1200,0)
        this.camera.lookAt(this.scene.position)
        this.view = 'default'
    }

    tactical_view(){
        this.camera.position.set(0,1500,200)
        this.camera.lookAt(this.scene.position)

        this.camera.position.set(0,1500,350)
        this.view = 'tactical'

    }

    battlefield_view(){
        this.camera.position.set(0,1200,500)
        this.camera.lookAt(this.scene.position)
        this.view = 'battlefield'
    }

    click_handling(){
        const raycaster = new THREE.Raycaster()
        const mouseVector = new THREE.Vector2() 
        const _this = this

        window.addEventListener('mousedown', function(e){
            mouseVector.x = (e.clientX/window.innerWidth)*2 - 1
            mouseVector.y = -(e.clientY/window.innerHeight)*2 + 1

            raycaster.setFromCamera(mouseVector, _this.camera)
            _this.intersects = raycaster.intersectObjects(_this.scene.children)

            console.log(_this.intersects[0])

            _this.card_handler()
            if(this.chosen_card != null){
                this.display_card_info()
            }
        })
    }

    create_description_display(){
        let desc = document.createElement('div')
        desc.style.position = 'absolute'
        desc.style.width = '250px'
        desc.style.height = '350px'
        desc.style.top = `${window.innerHeight/2 - 200}px`
        desc.style.left = '0px'
        desc.style.zIndex = '1000'
        
        desc.style.backgroundColor = 'rgb(155, 88, 133)'
        desc.style.border = '2px solid black'
        desc.style.fontSize = '20px'
        desc.style.fontFamily = 'Bradley Hand, cursive'
        desc.style.visibility = 'hidden'

        document.body.append(desc)
        return desc
    }

    display_card_info(card){
        if(this.currently_displayed_card != null && card != null && this.description_display.style.visibility == 'visible' && card.name == this.currently_displayed_card.name){
            this.description_display.style.visibility = 'hidden'
            this.currently_displayed_card = null
        }
        else if(card != null){
            this.description_display.style.visibility = 'visible'
    
            this.description_display.innerText = `${(card.name).toUpperCase()}\n`
            this.description_display.innerText += `Fraction: ${card.fraction}\n\n`
            this.description_display.innerText += `Mana cost: ${card.mana_cost}\n`
            this.description_display.innerText += `Hp: ${card.hp}\n`
            this.description_display.innerText += `Atk: ${card.atk}\n\n`
            this.description_display.innerText += `${card.description}\n`
        }

        else{
            this.description_display.style.visibility = 'hidden'
            this.currently_displayed_card = null
        }
    }

    card_handler(){
        let clicked = this.intersects[0]

        for(let card of this.board.cards){
            if(clicked.object.position.x == card.mesh.position.x && clicked.object.position.z == card.mesh.position.z){
                if(card.state == 'board'){
                    return 
                }
                //sets chosen_card to the clicked one
                this.chosen_card = card
                
                //amplify effect of choosing card with adjusting its height
                //if left, lower its height
                this.chosen_card.object_group.position.y += 20

                console.log(card)
                console.log('card chosen')
            }
        }
    }

    get_card_to_display_desc(clicked){
        for(let card of this.board.cards){
            if(clicked.object.position.x == card.mesh.position.x && clicked.object.position.z == card.mesh.position.z){
                return card
            }
        }
    }

    context_menu_display_card_info(){
        const _this = this
        const raycaster = new THREE.Raycaster()
        const mouseVector = new THREE.Vector2() 

        window.addEventListener('contextmenu', function(e){
            e.preventDefault()

            mouseVector.x = (e.clientX/window.innerWidth)*2 - 1
            mouseVector.y = -(e.clientY/window.innerHeight)*2 + 1

            raycaster.setFromCamera(mouseVector, _this.camera)
            let intersects = raycaster.intersectObjects(_this.scene.children)
            
            let card_to_display;
            if(intersects != null){
                card_to_display = _this.get_card_to_display_desc(intersects[0])
                _this.display_card_info(card_to_display)
                _this.currently_displayed_card = card_to_display
            }
        })
    }

    card_placement(chosen_card, intersects){
        if(this.player_grid == null){
            this.player_grid = this.board.grid_display.splice(14, 28)
        }

        if(intersects != null && intersects[1] != null && chosen_card != null){
            for(let grid_placeholder of this.player_grid){
                if(intersects[1].object.position.x == grid_placeholder.position.x && intersects[1].object.position.z == grid_placeholder.position.z){
                    if(grid_placeholder.used == false){
                        grid_placeholder.used = true
                        chosen_card.state = 'board'

                        console.log(chosen_card.mesh.position, grid_placeholder.position)
                        
                        chosen_card.object_group.position.y -= 5
                        chosen_card.mesh.position.x = grid_placeholder.position.x
                        chosen_card.mesh.position.z = grid_placeholder.position.z
                        chosen_card.update_position()
    
                        console.log(chosen_card.object_group.position, grid_placeholder.position)
                    } 
                }
            }
        }
    }

    card_moving(){
        const _this = this
        const raycaster = new THREE.Raycaster()
        const mouseVector = new THREE.Vector2() 

        let starting_x;
        let starting_z;
        window.addEventListener('mousedown', function(e){
            starting_x = e.clientX
            starting_z = e.clientY
        })

        window.addEventListener('mousemove', function(e){            
            let x = e.clientX
            let z = e.clientY
        

            if(_this.chosen_card != null){
                _this.chosen_card.update_position()
                
                _this.chosen_card.mesh.position.x = x - window.innerWidth/2
                _this.chosen_card.mesh.position.z = z - window.innerHeight/2
            }
        })

        window.addEventListener('mouseup', function(e){
            console.log(_this.chosen_card)
            

            mouseVector.x = (e.clientX/window.innerWidth)*2 - 1
            mouseVector.y = -(e.clientY/window.innerHeight)*2 + 1

            raycaster.setFromCamera(mouseVector, _this.camera)
            let drop_intersects = raycaster.intersectObjects(_this.scene.children)
            //placing cards on the grid
            _this.card_placement(_this.chosen_card, drop_intersects)
            
            if(_this.chosen_card) _this.chosen_card.object_group.position.y = 10
            _this.chosen_card = null
            console.log('no chosen card', _this.chosen_card)
        })
    }

    create_axes(){
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)
    }

    render(){
        requestAnimationFrame(this.render.bind(this))
        console.log('rendering in progress')

        this.renderer.render(this.scene, this.camera)
    }
}

