//Paginas del menu

const ListaPaginas = [
    {
        primary: "Status",

        children: [
            { to:"/Status/Tienda", primary:"Status Tienda" }
        ]
    },
    {
        primary: "SGV",

        children: [
            { to:"/SGV/DetalleDocumentos", primary:"Detalle documentos" },
            { to:"/SGV/ConsultaTranxSinFolio", primary:"Consulta Tranx Sin Folio" },
            { to:"/SGV/ConsultaTranxMEXS", primary:"Consulta Tranx MEXS" }
        ]
    },
    {
        primary:"CDP",

        children: [
            { to:"/CDP/totales", primary:"Totales CDP" },
            { to:"/CDP/excluir-tienda-alarma", primary:"Excluir tienda alarma" },
            { to:"/CDP/eamtran", primary:"Detalles EAMTRAN" }
        ]
    },
    {
        primary:"TSAV",

        children: [
            { to:"/TSAV/interfaces-con-error", primary:"Admin interfaces TSAV" },
        ]
    },
    {
        primary:"Interfaces",
 
        children: [
            { to:"/Interfaces/regenerar-vta", primary:"Regenerar VTA" },
            { to:"/Interfaces/reenviar-cc3", primary:"Reenviar CC3" }
        ]
    },
    {
        primary:"Admin",
 
        children: [
            { to:"/Admin/Usuarios", primary:"Usuarios" },
            { to:"/Admin/Perfiles", primary:"Perfiles" },
            { to:"/Admin/Logs", primary:"Logs" }
        ]
    },
];

export default ListaPaginas;