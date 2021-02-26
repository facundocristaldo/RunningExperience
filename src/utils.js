export function ConvertMinSegDurationToSeg(duration = { minutos: 0, segundos: 0 }) {
    return duration.minutos * 60 + duration.segundos
}