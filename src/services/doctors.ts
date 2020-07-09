import {jsonFetch} from '@/helpers/jsonFetch';
import {generateApiUrl} from '@/helpers/generateApiUrl';

import {DoctorDto} from '@/services/dto/doctors.dto';

export const getDoctors = () => jsonFetch<{doctors: DoctorDto[]}>(
    generateApiUrl('/doctor'),
);
