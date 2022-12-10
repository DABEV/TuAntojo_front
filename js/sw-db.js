const apiSw = ''
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
                product_id: localStorage.getItem("product_id"),
                store_id: localStorage.getItem("store_id"),
                user_id: localStorage.getItem("user_id")
            },
            offMode: true
        }
        const respOffline = new Response(
            JSON.stringify(resBodyOffline), {
            headers: {
                'Content-type': 'application/json'
            }
        }
        )
        return respOffline;
    })
}

function sendPostOrders() {
    const allPromise =[];
    db.allDocs({ include_docs: true })
        .then((docs) => {
            docs.rows.forEach(row => {
                const doc = row.doc;
                const prom = fetch(apiSw, {
                    method: 'POST',
                    body: JSON.stringify(doc),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((resp) => {
                    db.remove(doc)
                });
                allPromise.push(prom);
            });
        })
        return allPromise;
}