
const estado={
    loading:true,
    error:null,
    data:[45,53,23]
};
console.log(estado);

//sobreescribimos el ob     jeto estado
const nuevoEstado={
    ...estado,
    loading:false
};
console.log(nuevoEstado);