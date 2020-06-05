






function make_tree(){
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");

    const tex=parseInt(document.getElementById("inp_tex").value);
    const tey=parseInt(document.getElementById("inp_tey").value);

    canvas.width=tex;
    canvas.height=tey;

    //
    const l_init=parseFloat(document.getElementById("inp_l_init").value);
    const l_min=parseFloat(document.getElementById("inp_l_min").value);
    const rap_l=parseFloat(document.getElementById("inp_l_rap").value); //new l=l*rap_taille

    const ep_init=parseFloat(document.getElementById("inp_ep_init").value);
    const rap_ep=parseFloat(document.getElementById("inp_ep_rap").value);

    const agl_init=parseFloat(document.getElementById("inp_agl_init").value);
    const ecart_agl=parseFloat(document.getElementById("inp_agl_ecart").value);
    const nb_nv_bra=parseInt(document.getElementById("inp_nb_nv_bra").value);

    const x_init=parseFloat(document.getElementById("inp_x_init").value);
    const y_init=parseFloat(document.getElementById("inp_y_init").value);

    const cl_init=[
        parseFloat(document.getElementById("inp_cl0_init").value),
        parseFloat(document.getElementById("inp_cl1_init").value),
        parseFloat(document.getElementById("inp_cl2_init").value)
    ];

    const cl_modif=[
        parseFloat(document.getElementById("inp_cl0_modif").value),
        parseFloat(document.getElementById("inp_cl1_modif").value),
        parseFloat(document.getElementById("inp_cl2_modif").value)
    ];

    const cl_bg=[
        parseFloat(document.getElementById("inp_cl0_bg").value),
        parseFloat(document.getElementById("inp_cl1_bg").value),
        parseFloat(document.getElementById("inp_cl2_bg").value)
    ];

    //



    ctx.fillStyle="rgb("+parseInt(cl_bg[2])+","+parseInt(cl_bg[1])+","+parseInt(cl_bg[2])+")";
    ctx.fillRect(0,0,tex,tey);

    //

    function rads(degrees)
    {
        var pi = Math.PI;
        return degrees * (pi/180);
    }make_your_fractal_tre


    function branche(x,y,longueur,agl,cl,ep,nb_gen){
        while(agl>=360){ agl=agl-360; }
        while(agl<0){ agl=360+agl; }
        //
        if(agl>=0 && agl<90){
            var dx=Math.sin(rads(agl))*longueur;
            var dy=-Math.cos(rads(agl))*longueur;
        }
        else if(agl>=90 && agl<180){
            var dx=Math.cos(rads(agl-90))*longueur;
            var dy=Math.sin(rads(agl-90))*longueur;
        }
        else if(agl>=180 && agl<270){
            var dx=-Math.sin(rads(agl-180))*longueur;
            var dy=Math.cos(rads(agl-180))*longueur;
        }
        else if(agl>=270 && agl<360){
            var dx=-Math.cos(rads(agl-270))*longueur;
            var dy=-Math.sin(rads(agl-270))*longueur;
        }
        //
        ctx.strokeStyle="rgb("+parseInt(cl[2])+","+parseInt(cl[1])+","+parseInt(cl[2])+")";
        ctx.lineWidth = ep;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+dx, y+dy);
        ctx.stroke();
        ctx.closePath();
        //
        if(longueur>l_min){
            var nl=longueur*rap_l;
            var ncl=cl;
            for(i=0; i<3; i++){
                ncl[i]+=cl_modif[i];
                if(ncl[i]>255){ ncl[i]=255; }
                if(ncl[i]<0){ ncl[i]=0; }
            }
            var nep=ep*rap_ep;

            nagls=[]; 

            if(nb_nv_bra%2==0){
                //si pair
                for(ii=1; ii<=nb_nv_bra/2; ii++){
                    nagls.push( agl+(ecart_agl/nb_nv_bra)*ii);
                }
                for(ii=1; ii<=nb_nv_bra/2; ii++){
                    nagls.push( agl+(ecart_agl/nb_nv_bra)*-ii);
                }
            }
            else{
                //si impair
                for(ii=1; ii<=(nb_nv_bra-1)/2; ii++){
                    nagls.push( agl+(ecart_agl/nb_nv_bra)*ii);
                }
                for(ii=1; ii<=(nb_nv_bra-1)/2; ii++){
                    nagls.push( agl+(ecart_agl/nb_nv_bra)*-ii);
                }
                nagls.push(agl);
            }
            
            for(na of nagls){
                
                branche(x+dx,y+dy,nl,na,ncl,nep,nb_gen+1);
            }
            
            

        }
    }

    branche(x_init,y_init,l_init,agl_init,cl_init,ep_init,0);
}
















