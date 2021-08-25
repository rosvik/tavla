import { useEffect, useState } from 'react'
import { Operator } from '@entur/sdk/lib/mobility/types'

import service from '../service'

async function fetchOperators(): Promise<Operator[]> {
    return service.mobility.getOperators()
}

export default function useOperators(ids?: string[]): Operator[] {
    const [operators, setOperators] = useState<Operator[]>([])

    useEffect(() => {
        fetchOperators()
            .then((data) => {
                if (ids && ids.length > 0) {
                    return setOperators(
                        data.filter((operator) => ids.includes(operator.id)),
                    )
                }
                setOperators(data)
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.error(error))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return operators
}
