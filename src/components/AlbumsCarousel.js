var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('react-responsive-carousel').Carousel;

const AlbumsCarousel = (props) => {


    const handlerCard = (ind) => {
        //let seleccion = document.getElementsByClassName('.thumb selected')[0];
        const { id_album, id_artista } = ind.props.children[0].props.value;
        props.dispatch(props.getSingleAlbumFromArtist(id_artista, id_album));
    }

    if (props.AllAlbumArtist.body != null) {

        return (
            <div
            >
                <Carousel
                    className='carousel'
                    showArrows={true}
                    onClickItem={(ind, elem) => {
                        //console.log(ind, elem);
                        handlerCard(elem);
                    }}
                >
                    {
                        props.AllAlbumArtist.body.map((al, ind) => {
                            return (
                                <div>
                                    <input
                                        type="hidden"
                                        id="objecto"
                                        name="objecto"
                                        value={al ? al : null} />
                                    <img src={al.imagen_album} alt="imagen album" />
                                    <p className="legend">{al.nombre_album}</p>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        );
    } else {
        return (<h1>No albums</h1>)
    }

};

export default AlbumsCarousel;