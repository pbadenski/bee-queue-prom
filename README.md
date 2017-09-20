# Bee-Queue Prom
[![npm version](https://badge.fury.io/js/bee-queue-prom.svg?style=flat)](http://badge.fury.io/js/bee-queue-prom)

Provides [Prometheus](https://prometheus.io/) metrics for [Bee-Queue](https://github.com/OptimalBits/bee-queue)

Metrics:
- waiting jobs (gauge)
- active jobs (gauge)
- completed jobs (gauge)
- failed jobs (gauge)
- delayed jobs (gauge)

## Usage
```typescript
import Queue from 'bee-queue';
import promClient from 'prom-client';
import * as bee-queueProm from 'bee-queue-prom';

const queue = new Queue('myQueue'...);

const bee-queueMetric = bee-queueProm.init({
  queue,
  promClient, // optional, it will use internal prom client if it is not given
  interval: 1000, // optional, in ms, default to 60000
});

bee-queueMetric.run();

// Metrics result in Promotheus
// jobs_waiting_total{queue_name="myQueue"} 0
// jobs_active_total{queue_name="myQueue"} 0
// jobs_complete_total{queue_name="myQueue"} 0
// jobs_failed_total{queue_name="myQueue"} 0
// jobs_delayed_total{queue_name="myQueue"} 0
```

## API
### init(options)
Initialize

options:
- queue (**required**): Bee-Queue queue
- promClient (*optional*): prom client instance
- interval (*optional*, default 5000): interval in ms to fetch the Bee-Queue statistic

### run()
Start running and fetching the data from Bee-Queue based on interval

### stop()
Stop running

## License
MIT © [Pawel Badenski](https://github.com/pbadenski)

This library is largely derived from [kue-prom](https://github.com/deerawan/kue-prom) (MIT © [Budi Irawan](https://github.com/deerawan))
