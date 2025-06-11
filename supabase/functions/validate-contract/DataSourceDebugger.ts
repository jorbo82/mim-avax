
export class DataSourceDebugger {
  private logs: any[] = []

  log(source: string, action: string, data: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      source,
      action,
      data,
      id: Math.random().toString(36).substr(2, 9)
    }
    
    this.logs.push(logEntry)
    console.log(`[${source}] ${action}:`, JSON.stringify(data, null, 2))
  }

  getDebugSummary() {
    return {
      totalLogs: this.logs.length,
      sources: [...new Set(this.logs.map(log => log.source))],
      actions: [...new Set(this.logs.map(log => log.action))],
      logs: this.logs
    }
  }

  validateAPY(apy: number, source: string): { isValid: boolean; reason?: string; adjustedAPY?: number } {
    if (isNaN(apy) || apy < 0) {
      this.log('APY_VALIDATOR', 'INVALID_NEGATIVE', { apy, source })
      return { isValid: false, reason: 'Negative or NaN APY', adjustedAPY: 0 }
    }

    if (apy > 1000) {
      this.log('APY_VALIDATOR', 'SUSPICIOUS_HIGH', { apy, source })
      return { isValid: false, reason: 'Suspiciously high APY (>1000%)', adjustedAPY: Math.min(apy, 100) }
    }

    if (apy > 100) {
      this.log('APY_VALIDATOR', 'HIGH_APY', { apy, source })
      return { isValid: true, reason: 'High APY detected but within reasonable bounds' }
    }

    return { isValid: true }
  }

  validateTVL(tvl: number, source: string): { isValid: boolean; reason?: string; adjustedTVL?: number } {
    if (isNaN(tvl) || tvl < 0) {
      this.log('TVL_VALIDATOR', 'INVALID_NEGATIVE', { tvl, source })
      return { isValid: false, reason: 'Negative or NaN TVL', adjustedTVL: 0 }
    }

    if (tvl > 1000000000) { // $1B cap
      this.log('TVL_VALIDATOR', 'SUSPICIOUS_HIGH', { tvl, source })
      return { isValid: false, reason: 'Suspiciously high TVL (>$1B)', adjustedTVL: Math.min(tvl, 10000000) }
    }

    return { isValid: true }
  }
}
