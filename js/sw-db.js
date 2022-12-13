const apiSw = 'http://localhost:8000/api/order/store'
const db = new PouchDB('orders');

function saveOrder(order){
    order._id = new Date().toISOString();
    return db.put(order).then(()=>{
        console.log('order saved');
        self.registration.sync.register('new-order');
        const resBodyOffline = {
            result: true,
            order: {
                amount: order.amount,
                payment: order.payment,
                status: 0,
                product_id: order.product_id,
                store_id: order.store_id,
                user_id: order.user_id
            },
            offMode: true
        }
        const respOffline = new Response(
            JSON.stringify(resBodyOffline), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respOffline;
    });
}

function sendPostOrders() {
    const allPromise =[];
    console.log("Si se está haciendo el sync");
    db.allDocs({ include_docs: true })
        .then((docs) => {
            docs.rows.forEach((row) => {
                const doc = row.doc;
                console.log(doc);
                const prom = fetch(apiSw, {
                    method: "POST",
                    body: JSON.stringify(doc),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((resp) => {
                    return db.remove(doc)
                });
                allPromise.push(prom);
            });
        });
        return allPromise;
}