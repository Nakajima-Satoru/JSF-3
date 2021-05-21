const Javelin=function(){};

const javelin=new Javelin();

javelin.option={
    animation:null,
};

javelin.locking={
    link:false,
    back:false,
};

javelin.cache={
    common:{},
    page:{},
    group:{},
    dialog:{},
    form:{},
    request:{},
    validator:{},
    logic:{},
    element:{},
    elements:{},
    data:{},
};

javelin.buffer={
    pageMoveIndex:0,
    pages:[],
};
