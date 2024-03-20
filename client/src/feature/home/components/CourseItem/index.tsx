import * as React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { useTheme } from '@material-ui/core';
interface CourseCardProps {
  imageUrl: string;
  title: string;
  description: string;
  duration: string;
  videoCount: number;
  studentCount: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  imageUrl,
  title,
  description,
  duration,
  videoCount,
  studentCount
}) => {
  const theme = useTheme();
  return (
    <article
      style={{ maxWidth: '385px', justifySelf: 'center' }}
      className="flex flex-col pb-6 text-base text-gray-800 bg-white rounded-xl ml-auto mr-auto"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-[1.56] rounded-t-xl"
          style={{
            maxWidth: '385px',
            maxHeight: '236px'
          }}
        />
        <div>
          <div className="absolute -bottom-4 right-0 bg-primary-500 text-white px-2 py-1 rounded-bl-xl">
            <div
              className="flex items-center py-1 px-3 rounded-full"
              style={{ backgroundColor: theme.palette.primary.main }}
            >
              <StarRateRoundedIcon color="secondary" />
              4,8
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 mt-5 w-full">
        <h2
          className="text-2xl font-medium tracking-normal leading-8"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 1
          }}
        >
          {title}
        </h2>
        <p
          className="mt-1 leading-6 text-justify text-gray-500"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            height: '48px'
          }}
        >
          {description}
        </p>
        <div className="flex gap-5 justify-between text-justify leading-[150%]">
          <div className="flex gap-2.5 text-gray-500">
            <AccessTimeIcon />
            <span>{duration} Jam</span>
          </div>
          <div className="flex gap-2.5 text-gray-500">
            <PlayCircleOutlineIcon />
            <span>{videoCount} Video</span>
          </div>
          <div className="flex gap-2.5 text-gray-500">
            <PeopleOutlineIcon />
            <span>{studentCount} Siswa</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
