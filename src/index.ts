import client = require('prom-client');

export interface Options {
  queue: any;
  promClient?: any;
  labels?: string[];
  interval?: number;
}

export function init(opts: Options) {
  const { queue, interval = 60000, promClient = client } = opts;
  const QUEUE_NAME_LABEL = 'queue_name';

  const activeMetricName    = 'jobs_active_total';
  const waitingMetricName   = 'jobs_waiting_total';
  const succeededMetricName = 'jobs_succeeded_total';
  const failedMetricName    = 'jobs_failed_total';
  const delayedMetricName   = 'jobs_delayed_total';

  const succeededMetric = new promClient.Gauge(succeededMetricName, 'Number of succeeded jobs', [ QUEUE_NAME_LABEL ]);
  const failedMetric    = new promClient.Gauge(failedMetricName,    'Number of failed jobs',    [ QUEUE_NAME_LABEL ]);
  const delayedMetric   = new promClient.Gauge(delayedMetricName,   'Number of delayed jobs',   [ QUEUE_NAME_LABEL ]);
  const activeMetric    = new promClient.Gauge(activeMetricName,    'Number of active jobs',    [ QUEUE_NAME_LABEL ]);
  const waitingMetric   = new promClient.Gauge(waitingMetricName,   'Number of waiting jobs',   [ QUEUE_NAME_LABEL ]);

  let metricInterval: any;

  function run() {
    metricInterval = setInterval(() => {
      queue.checkHealth().then(({ succeeded, failed, delayed, active, waiting }: any) => {
        succeededMetric.labels((queue as any).name).set(succeeded || 0);
        failedMetric.labels((queue as any).name).set(failed || 0);
        delayedMetric.labels((queue as any).name).set(delayed || 0);
        activeMetric.labels((queue as any).name).set(active || 0);
        waitingMetric.labels((queue as any).name).set(waiting || 0);
      });
    }, interval);
  }

  function stop() {
    metricInterval.clearInterval();
  }

  return {
    run,
    stop,
  };
}
