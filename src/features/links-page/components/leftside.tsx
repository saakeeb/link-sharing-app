import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Link, MoveRight } from 'lucide-react';
import React, { memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { SocialLinksProps, useLinksShare } from '@/stores/links-store';
import { useUserInfo } from '@/stores/user-store';

export const LinkView = memo(() => {
  const socialLinks = useLinksShare((state) => state.socialLinks);
  const updateSocialLinksOrder = useLinksShare(
    (state) => state.updateSocialLinksOrder,
  );
  const navigate = useNavigate();
  const location = useLocation();
  const setSelectedSocialLink = useLinksShare(
    (state) => state.setSelectedSocialLink,
  );
  const userInfo = useUserInfo((state) => state.userInfo);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const startIndex = result.source.index;
      const endIndex = result.destination.index;

      const copylinks = Array.from(socialLinks);
      const [reorderlink] = copylinks.splice(startIndex, 1);
      copylinks.splice(endIndex, 0, reorderlink);

      updateSocialLinksOrder(copylinks);
    },
    [socialLinks, updateSocialLinksOrder],
  );

  const handleEditLinks = useCallback(
    (link: SocialLinksProps) => {
      if (location.pathname !== '/') {
        navigate('/');
      }
      setSelectedSocialLink(link);
    },
    [location.pathname, navigate, setSelectedSocialLink],
  );

  return (
    <div className="my-10 flex items-center justify-center">
      <div
        className={`w-72 rounded-3xl bg-white p-1 shadow-lg ${location.pathname !== '/preview' ? 'relative h-[600px] border-2 border-gray-800' : ''}`}
      >
        <div
          className={`${location.pathname !== '/preview' ? 'relative h-[588px] w-[276px] rounded-3xl border-2 border-gray-800 bg-white shadow-2xl' : ''}`}
        >
          {location.pathname !== '/preview' && (
            <div className="absolute -top-[5px] left-1/2 z-10 flex h-6 w-[140px] -translate-x-1/2 items-center justify-around rounded-2xl border-2 border-black border-t-white bg-white">
              <div className="size-2 rounded-full bg-black"></div>
              <div className="h-2 w-20 rounded-lg bg-slate-600"></div>
            </div>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div>
              {userInfo.profile ? (
                <div className="size-24 rounded-full border-2 border-[#633BFE]">
                  <img
                    src={userInfo.profile}
                    alt={`Link Share by ${userInfo.firstName}`}
                    className="size-24 rounded-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="size-20 rounded-full border-2 border-slate-200 bg-slate-200"></div>
              )}
            </div>
            {userInfo.firstName ? (
              <p className="text-xl font-semibold text-slate-800">
                {userInfo.firstName} {userInfo.lastName}
              </p>
            ) : (
              <div className="h-6 w-40 rounded-lg bg-slate-200"></div>
            )}
            {userInfo.firstName ? (
              <p className="text-sm text-slate-500">{userInfo.email}</p>
            ) : (
              <div className="h-4 w-20 rounded-lg bg-slate-200"></div>
            )}
          </div>
          <div className="mt-10 h-80 overflow-hidden">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="links">
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex h-full flex-col items-center justify-between gap-4 overflow-y-auto p-4"
                    aria-label="Social Links List"
                  >
                    {socialLinks.map(
                      (link: SocialLinksProps, index: number) => (
                        <Draggable
                          key={link.id}
                          draggableId={link.id || ''}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex w-full items-center justify-between rounded-lg py-3 text-left text-white shadow transition  
                      ${snapshot.isDragging ? 'opacity-75' : ''}
                      ${link?.color ? link.color : 'bg-[#633BFE]'}
                    `}
                              aria-label={`Link to ${link.platform}`}
                            >
                              <div className="flex justify-start gap-2 pl-2">
                                <Link size={20} aria-hidden="true" />
                                <span>{link.platform}</span>
                              </div>
                              <button
                                title="Edit Link"
                                className="pr-2"
                                onClick={() => handleEditLinks(link)}
                                aria-label={`Edit ${link.platform} link`}
                              >
                                <MoveRight aria-hidden="true" />
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ),
                    )}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
});
LinkView.displayName = 'LinkView';
