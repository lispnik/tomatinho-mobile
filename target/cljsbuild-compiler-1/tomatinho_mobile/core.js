goog.provide('tomatinho.core');
goog.require('cljs.core');
goog.require('domina.events');
goog.require('domina.css');
goog.require('domina');
goog.require('tomatinho.jquery_mobile');
goog.require('tomatinho.utils');
goog.require('tomatinho.jquery_mobile');
goog.require('tomatinho.utils');
goog.require('tomatinho.templates');
goog.require('goog.date.DateTime');
goog.require('domina.events');
goog.require('goog.dom');
goog.require('hiccups.runtime');
goog.require('goog.Timer');
goog.require('domina');
goog.require('goog.object');
goog.require('domina.css');
goog.require('shoreleave.browser.storage.localstorage');
tomatinho.core.pomodoro_length = tomatinho.utils.s__GT_ms.call(null,(25 * 60));
tomatinho.core.editanda = cljs.core.atom.call(null,null);
tomatinho.core.timer_STAR_ = cljs.core.atom.call(null,null);
tomatinho.core.last_updated = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
tomatinho.core.storage = shoreleave.browser.storage.localstorage.storage.call(null);
tomatinho.core.append_to_body_BANG_ = (function append_to_body_BANG_(x){
return domina.append_BANG_.call(null,domina.css.sel.call(null,"div.ui-page-active"),x);
});
tomatinho.core.beep = (function() {
var beep = null;
var beep__0 = (function (){
return beep.call(null,1);
});
var beep__1 = (function (n){
try{return navigator.notification.beep(n);
}catch (e5178){if(cljs.core.instance_QMARK_.call(null,Object,e5178))
{var e = e5178;
return null;
} else
{if("\uFDD0'else")
{throw e5178;
} else
{return null;
}
}
}});
beep = function(n){
switch(arguments.length){
case 0:
return beep__0.call(this);
case 1:
return beep__1.call(this,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
beep.cljs$lang$arity$0 = beep__0;
beep.cljs$lang$arity$1 = beep__1;
return beep;
})()
;
tomatinho.core.vibrate = (function() {
var vibrate = null;
var vibrate__0 = (function (){
return vibrate.call(null,tomatinho.utils.s__GT_ms.call(null,1));
});
var vibrate__1 = (function (n){
try{return navigator.notification.vibrate(n);
}catch (e5180){if(cljs.core.instance_QMARK_.call(null,Object,e5180))
{var e = e5180;
return null;
} else
{if("\uFDD0'else")
{throw e5180;
} else
{return null;
}
}
}});
vibrate = function(n){
switch(arguments.length){
case 0:
return vibrate__0.call(this);
case 1:
return vibrate__1.call(this,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
vibrate.cljs$lang$arity$0 = vibrate__0;
vibrate.cljs$lang$arity$1 = vibrate__1;
return vibrate;
})()
;
tomatinho.core.update_notification = (function update_notification(){
var options = cljs.core.PersistentVector.fromArray(["\uFDD0'quiet","\uFDD0'normal","\uFDD0'noisy"], true);
var new$ = tomatinho.templates.notification.call(null,options,(new cljs.core.Keyword("\uFDD0'notifications")).call(null,tomatinho.core.storage));
var G__5186_5188 = cljs.core.seq.call(null,options);
while(true){
if(G__5186_5188)
{var option_5189 = cljs.core.first.call(null,G__5186_5188);
domina.events.unlisten_BANG_.call(null,domina.css.sel.call(null,cljs.core.format.call(null,"#notification a.b%s",cljs.core.name.call(null,option_5189))),"\uFDD0'click");
{
var G__5190 = cljs.core.next.call(null,G__5186_5188);
G__5186_5188 = G__5190;
continue;
}
} else
{}
break;
}
domina.destroy_BANG_.call(null,domina.css.sel.call(null,"#notification div"));
domina.prepend_BANG_.call(null,domina.css.sel.call(null,"#notification"),new$);
tomatinho.jquery_mobile.make_horizontal_control_group.call(null,"#notification .buttons");
var G__5187 = cljs.core.seq.call(null,options);
while(true){
if(G__5187)
{var option = cljs.core.first.call(null,G__5187);
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,cljs.core.format.call(null,"#notification a.b%s",cljs.core.name.call(null,option))),"\uFDD0'click",((function (G__5187,option){
return (function (){
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'notifications",option);
return update_notification.call(null);
});})(G__5187,option))
);
{
var G__5191 = cljs.core.next.call(null,G__5187);
G__5187 = G__5191;
continue;
}
} else
{return null;
}
break;
}
});
tomatinho.core.update_resources = (function update_resources(){
var right_now = goog.now();
var morning = (function (){var G__5203 = tomatinho.utils.now.call(null);
G__5203.setHours(8);
G__5203.setMinutes(0);
return G__5203;
})().getTime();
var first_pomodoro = (function (){var temp__3971__auto__ = cljs.core.first.call(null,(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage));
if(cljs.core.truth_(temp__3971__auto__))
{var map__5204 = temp__3971__auto__;
var map__5204__$1 = ((cljs.core.seq_QMARK_.call(null,map__5204))?cljs.core.apply.call(null,cljs.core.hash_map,map__5204):map__5204);
var duration = cljs.core._lookup.call(null,map__5204__$1,"\uFDD0'duration",null);
var end = cljs.core._lookup.call(null,map__5204__$1,"\uFDD0'end",null);
return (end - duration);
} else
{return null;
}
})();
var planned = (new cljs.core.Keyword("\uFDD0'planned")).call(null,tomatinho.core.storage);
var current_set = (function (){var _BANG__BANG_ = tomatinho.utils.make_time.call(null,right_now);
return cljs.core.PersistentHashSet.fromArray([cljs.core.PersistentVector.fromArray([_BANG__BANG_.getHours(),(((_BANG__BANG_.getMinutes() < 30))?0:30)], true)]);
})();
var actual = cljs.core.map.call(null,(function (p1__5181_SHARP_){
return (function (k){
return cljs.core.ObjMap.fromObject(["\uFDD0'end","\uFDD0'hours","\uFDD0'truncated-minutes"],{"\uFDD0'end":(new cljs.core.Keyword("\uFDD0'end")).call(null,p1__5181_SHARP_),"\uFDD0'hours":k.getHours(),"\uFDD0'truncated-minutes":(((k.getMinutes() < 30))?0:30)});
}).call(null,tomatinho.utils.make_time.call(null,((new cljs.core.Keyword("\uFDD0'end")).call(null,p1__5181_SHARP_) - (new cljs.core.Keyword("\uFDD0'duration")).call(null,p1__5181_SHARP_))));
}),(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage));
var start = (function (){var or__3824__auto__ = (new cljs.core.Keyword("\uFDD0'day-start")).call(null,tomatinho.core.storage);
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return tomatinho.utils.make_time.call(null,(cljs.core.truth_(first_pomodoro)?((((morning > first_pomodoro) ? morning : first_pomodoro) < right_now) ? ((morning > first_pomodoro) ? morning : first_pomodoro) : right_now):right_now)).getHours();
}
})();
var end = (new cljs.core.Keyword("\uFDD0'day-end")).call(null,tomatinho.core.storage);
var so_far = cljs.core.count.call(null,(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage));
var facienda = (function (){var map__5205 = cljs.core.last.call(null,actual);
var map__5205__$1 = ((cljs.core.seq_QMARK_.call(null,map__5205))?cljs.core.apply.call(null,cljs.core.hash_map,map__5205):map__5205);
var h = cljs.core._lookup.call(null,map__5205__$1,"\uFDD0'hours",null);
var m = cljs.core._lookup.call(null,map__5205__$1,"\uFDD0'truncate-minutes",null);
var after_h_m = (function (p__5206){
var vec__5207 = p__5206;
var h_SINGLEQUOTE_ = cljs.core.nth.call(null,vec__5207,0,null);
var m_SINGLEQUOTE_ = cljs.core.nth.call(null,vec__5207,1,null);
var or__3824__auto__ = (h < h_SINGLEQUOTE_);
if(or__3824__auto__)
{return or__3824__auto__;
} else
{var and__3822__auto__ = cljs.core._EQ_.call(null,h,h_SINGLEQUOTE_);
if(and__3822__auto__)
{return (m < m_SINGLEQUOTE_);
} else
{return and__3822__auto__;
}
}
});
return cljs.core.count.call(null,cljs.core.filter.call(null,after_h_m,planned));
})();
var G__5208_5214 = domina.css.sel.call(null,"#day-plan tr.time");
domina.events.unlisten_BANG_.call(null,G__5208_5214);
domina.destroy_BANG_.call(null,G__5208_5214);
var G__5209_5215 = cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray(["#start-hour",cljs.core.format.call(null,"%02d:00",start)], true),cljs.core.PersistentVector.fromArray(["#end-hour",cljs.core.format.call(null,"%02d:00",end)], true),cljs.core.PersistentVector.fromArray(["#pomodoro-max",(facienda + so_far)], true),cljs.core.PersistentVector.fromArray(["#pomodoro-count",so_far], true)], true));
while(true){
if(G__5209_5215)
{var vec__5210_5216 = cljs.core.first.call(null,G__5209_5215);
var place_5217 = cljs.core.nth.call(null,vec__5210_5216,0,null);
var text_5218 = cljs.core.nth.call(null,vec__5210_5216,1,null);
domina.set_text_BANG_.call(null,domina.css.sel.call(null,place_5217),text_5218);
{
var G__5219 = cljs.core.next.call(null,G__5209_5215);
G__5209_5215 = G__5219;
continue;
}
} else
{}
break;
}
var G__5211_5220 = cljs.core.seq.call(null,cljs.core.range.call(null,start,(end + 1)));
while(true){
if(G__5211_5220)
{var hour_5221 = cljs.core.first.call(null,G__5211_5220);
var find_nearest_actual_5222 = ((function (G__5211_5220,hour_5221){
return (function (minutes){
return tomatinho.utils.find_first.call(null,((function (G__5211_5220,hour_5221){
return (function (p1__5182_SHARP_){
var and__3822__auto__ = cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'truncated-minutes")).call(null,p1__5182_SHARP_),minutes);
if(and__3822__auto__)
{return cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'hours")).call(null,p1__5182_SHARP_),hour_5221);
} else
{return and__3822__auto__;
}
});})(G__5211_5220,hour_5221))
,actual);
});})(G__5211_5220,hour_5221))
;
var get_time_at_5223 = ((function (G__5211_5220,hour_5221){
return (function (minutes){
return ((function (){var G__5212 = tomatinho.utils.now.call(null);
G__5212.setHours(hour_5221);
G__5212.setMinutes(minutes);
return G__5212;
})().getTime() + tomatinho.core.pomodoro_length);
});})(G__5211_5220,hour_5221))
;
domina.append_BANG_.call(null,domina.css.sel.call(null,"#day-plan tbody"),tomatinho.templates.hour_line.call(null,hour_5221,planned,current_set,cljs.core.map.call(null,find_nearest_actual_5222,cljs.core.PersistentVector.fromArray([0,30], true)),cljs.core.map.call(null,get_time_at_5223,cljs.core.PersistentVector.fromArray([0,30], true))));
{
var G__5224 = cljs.core.next.call(null,G__5211_5220);
G__5211_5220 = G__5224;
continue;
}
} else
{}
break;
}
var G__5213 = cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'click"], true));
while(true){
if(G__5213)
{var kind = cljs.core.first.call(null,G__5213);
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#day-plan tr.time"),kind,((function (G__5213,kind){
return (function (p1__5183_SHARP_){
return tomatinho.core.handle_plan_click.call(null,p1__5183_SHARP_,kind);
});})(G__5213,kind))
);
{
var G__5225 = cljs.core.next.call(null,G__5213);
G__5213 = G__5225;
continue;
}
} else
{return null;
}
break;
}
});
tomatinho.core.update_button = (function() {
var update_button = null;
var update_button__0 = (function (){
return update_button.call(null,cljs.core.deref.call(null,tomatinho.core.timer_STAR_),(new cljs.core.Keyword("\uFDD0'current")).call(null,tomatinho.core.storage),tomatinho.utils.now.call(null));
});
var update_button__3 = (function (timer,current,now_object){
domina.destroy_BANG_.call(null,domina.by_id.call(null,"timer-text"));
return domina.append_BANG_.call(null,domina.by_id.call(null,"current-time"),tomatinho.templates.time_button.call(null,timer,current,now_object));
});
update_button = function(timer,current,now_object){
switch(arguments.length){
case 0:
return update_button__0.call(this);
case 3:
return update_button__3.call(this,timer,current,now_object);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
update_button.cljs$lang$arity$0 = update_button__0;
update_button.cljs$lang$arity$3 = update_button__3;
return update_button;
})()
;
tomatinho.core.update_status = (function update_status(){
domina.destroy_BANG_.call(null,domina.by_class.call(null,"status"));
var timer = cljs.core.deref.call(null,tomatinho.core.timer_STAR_);
var current = (new cljs.core.Keyword("\uFDD0'current")).call(null,tomatinho.core.storage);
var G__5227 = cljs.core.seq.call(null,tomatinho.utils.aggregate_time_blocks.call(null,(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage),tomatinho.core.pomodoro_length,timer));
while(true){
if(G__5227)
{var items = cljs.core.first.call(null,G__5227);
domina.append_BANG_.call(null,domina.by_id.call(null,"pomodoros"),tomatinho.templates.pomodoro_list.call(null,items,tomatinho.core.pomodoro_length,timer,current));
{
var G__5228 = cljs.core.next.call(null,G__5227);
G__5227 = G__5228;
continue;
}
} else
{return null;
}
break;
}
});
tomatinho.core.update_goals_popup = (function update_goals_popup(){
var goals = cljs.core.vec.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage));
var new$ = tomatinho.templates.goals_popup_list.call(null,goals);
domina.prepend_BANG_.call(null,domina.css.sel.call(null,"#goals-popup .placeholder"),new$);
tomatinho.jquery_mobile.update_page.call(null);
tomatinho.jquery_mobile.reposition_popup_to_origin.call(null,"#goals-popup");
var G__5232 = cljs.core.seq.call(null,goals);
while(true){
if(G__5232)
{var vec__5233 = cljs.core.first.call(null,G__5232);
var id = cljs.core.nth.call(null,vec__5233,0,null);
var map__5234 = cljs.core.nth.call(null,vec__5233,1,null);
var map__5234__$1 = ((cljs.core.seq_QMARK_.call(null,map__5234))?cljs.core.apply.call(null,cljs.core.hash_map,map__5234):map__5234);
var complete = cljs.core._lookup.call(null,map__5234__$1,"\uFDD0'complete",null);
var date = cljs.core._lookup.call(null,map__5234__$1,"\uFDD0'date",null);
var name = cljs.core._lookup.call(null,map__5234__$1,"\uFDD0'name",null);
domina.events.listen_BANG_.call(null,domina.by_id.call(null,id),"\uFDD0'click",((function (G__5232,vec__5233,id,map__5234,map__5234__$1,complete,date,name){
return (function (){
return tomatinho.core.handle_click_goal.call(null,id,complete);
});})(G__5232,vec__5233,id,map__5234,map__5234__$1,complete,date,name))
);
domina.events.listen_BANG_.call(null,domina.by_id.call(null,[cljs.core.str("d"),cljs.core.str(cljs.core.name.call(null,id))].join('')),"\uFDD0'click",((function (G__5232,vec__5233,id,map__5234,map__5234__$1,complete,date,name){
return (function (){
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'goals",cljs.core.dissoc.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage),id));
return tomatinho.core.update_goals.call(null);
});})(G__5232,vec__5233,id,map__5234,map__5234__$1,complete,date,name))
);
domina.events.listen_BANG_.call(null,domina.by_id.call(null,[cljs.core.str("e"),cljs.core.str(cljs.core.name.call(null,id))].join('')),"\uFDD0'click",((function (G__5232,vec__5233,id,map__5234,map__5234__$1,complete,date,name){
return (function (){
cljs.core.reset_BANG_.call(null,tomatinho.core.editanda,id);
return domina.set_value_BANG_.call(null,domina.css.sel.call(null,"#add-popup input"),name);
});})(G__5232,vec__5233,id,map__5234,map__5234__$1,complete,date,name))
);
{
var G__5235 = cljs.core.next.call(null,G__5232);
G__5232 = G__5235;
continue;
}
} else
{return null;
}
break;
}
});
tomatinho.core.update_goals = (function update_goals(){
domina.destroy_BANG_.call(null,domina.by_class.call(null,"goal"));
var goals = cljs.core.vec.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage));
var new$ = tomatinho.templates.simple_goals_list.call(null,goals);
var G__5237_5238 = cljs.core.seq.call(null,domina.nodes.call(null,domina.css.sel.call(null,".simple-list ul")));
while(true){
if(G__5237_5238)
{var parent_5239 = cljs.core.first.call(null,G__5237_5238);
domina.append_BANG_.call(null,parent_5239,new$);
{
var G__5240 = cljs.core.next.call(null,G__5237_5238);
G__5237_5238 = G__5240;
continue;
}
} else
{}
break;
}
if(cljs.core.truth_(domina.css.sel.call(null,"#goals-popup")))
{return tomatinho.core.update_goals_popup.call(null);
} else
{return null;
}
});
tomatinho.core.update_reflectanda = (function update_reflectanda(){
domina.destroy_BANG_.call(null,domina.by_class.call(null,"reflectanda"));
var nodes = tomatinho.templates.reflectanda.call(null,(new cljs.core.Keyword("\uFDD0'reflectanda")).call(null,tomatinho.core.storage),tomatinho.core.create_info_popup);
var parent = domina.css.sel.call(null,"#review tbody");
var G__5242 = cljs.core.seq.call(null,nodes);
while(true){
if(G__5242)
{var node = cljs.core.first.call(null,G__5242);
domina.append_BANG_.call(null,parent,node);
{
var G__5243 = cljs.core.next.call(null,G__5242);
G__5242 = G__5243;
continue;
}
} else
{return null;
}
break;
}
});
tomatinho.core.create_info_popup = (function create_info_popup(n){
domina.destroy_BANG_.call(null,domina.by_id.call(null,"info-popup"));
return tomatinho.jquery_mobile.make_popup.call(null,tomatinho.templates.info_popup.call(null,cljs.core._lookup.call(null,cljs.core.vec.call(null,(new cljs.core.Keyword("\uFDD0'reflectanda")).call(null,tomatinho.core.storage)),n,null),tomatinho.core.pomodoro_length));
});
tomatinho.core.handle_range_click = (function handle_range_click(e){
var temp__3971__auto__ = cljs.core.re_seq.call(null,/\w+/,e.evt.target.id);
if(cljs.core.truth_(temp__3971__auto__))
{var vec__5245 = temp__3971__auto__;
var kind = cljs.core.nth.call(null,vec__5245,0,null);
var hour = cljs.core.nth.call(null,vec__5245,1,null);
var keyword = cljs.core._lookup.call(null,cljs.core.ObjMap.fromObject(["start","end"],{"start":"\uFDD0'day-start","end":"\uFDD0'day-end"}),kind,null);
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,keyword,cljs.core.int$.call(null,hour));
tomatinho.core.update_resources.call(null);
return tomatinho.jquery_mobile.close_popup.call(null,"#popup");
} else
{return null;
}
});
tomatinho.core.create_range_popup = (function create_range_popup(e){
domina.destroy_BANG_.call(null,domina.by_id.call(null,"popup"));
var vec__5247 = cljs.core.map.call(null,tomatinho.core.storage,cljs.core.PersistentVector.fromArray(["\uFDD0'day-start","\uFDD0'day-end"], true));
var start = cljs.core.nth.call(null,vec__5247,0,null);
var end = cljs.core.nth.call(null,vec__5247,1,null);
var current = tomatinho.utils.now.call(null).getHours();
var popup = tomatinho.templates.range_popup.call(null,start,end,current);
tomatinho.jquery_mobile.make_popup.call(null,popup);
return domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"table.range td"),"\uFDD0'click",tomatinho.core.handle_range_click);
});
tomatinho.core.create_goals_popup = (function create_goals_popup(){
domina.events.unlisten_BANG_.call(null,domina.css.sel.call(null,"#goals-popup .add"),"\uFDD0'click");
domina.events.unlisten_BANG_.call(null,domina.css.sel.call(null,"#add-popup .add"),"\uFDD0'click");
domina.destroy_BANG_.call(null,domina.by_id.call(null,"goals-popup"));
domina.destroy_BANG_.call(null,domina.by_id.call(null,"add-popup"));
var goals_popup_5250 = tomatinho.templates.goals_popup_base.call(null);
var add_popup_5251 = tomatinho.templates.add_popup.call(null,"");
var G__5249_5252 = cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([goals_popup_5250,add_popup_5251], true));
while(true){
if(G__5249_5252)
{var clone_5253 = cljs.core.first.call(null,G__5249_5252);
tomatinho.core.append_to_body_BANG_.call(null,clone_5253);
{
var G__5254 = cljs.core.next.call(null,G__5249_5252);
G__5249_5252 = G__5254;
continue;
}
} else
{}
break;
}
tomatinho.jquery_mobile.make_popup_without_opening.call(null,"#add-popup");
tomatinho.jquery_mobile.make_popup.call(null,"#goals-popup");
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#goals-popup .add"),"\uFDD0'click",(function (){
return cljs.core.reset_BANG_.call(null,tomatinho.core.editanda,null);
}));
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#add-popup .add"),"\uFDD0'click",tomatinho.core.handle_ok_click);
return tomatinho.core.update_goals.call(null);
});
tomatinho.core.create_archive_popup = (function create_archive_popup(){
tomatinho.jquery_mobile.close_all_popups.call(null);
domina.destroy_BANG_.call(null,domina.css.sel.call(null,"#archive-popup"));
tomatinho.core.append_to_body_BANG_.call(null,tomatinho.templates.archive_popup.call(null));
tomatinho.jquery_mobile.make_popup.call(null,"#archive-popup");
var G__5256 = cljs.core.seq.call(null,cljs.core.range.call(null,1,6));
while(true){
if(G__5256)
{var x = cljs.core.first.call(null,G__5256);
domina.events.listen_BANG_.call(null,domina.by_id.call(null,[cljs.core.str("f"),cljs.core.str(x)].join('')),"\uFDD0'click",((function (G__5256,x){
return (function (){
tomatinho.jquery_mobile.close_popup.call(null,"#archive-popup");
return tomatinho.core.archive.call(null,x);
});})(G__5256,x))
);
{
var G__5257 = cljs.core.next.call(null,G__5256);
G__5256 = G__5257;
continue;
}
} else
{return null;
}
break;
}
});
tomatinho.core.update_all = (function update_all(){
tomatinho.core.update_resources.call(null);
tomatinho.core.update_notification.call(null);
tomatinho.core.update_reflectanda.call(null);
tomatinho.core.update_goals.call(null);
tomatinho.core.update_status.call(null);
return tomatinho.core.update_button.call(null);
});
tomatinho.core.handle_click_goal = (function handle_click_goal(id,checked_QMARK_){
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'goals",cljs.core.update_in.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage),cljs.core.PersistentVector.fromArray([id,"\uFDD0'complete"], true),(function() { 
var G__5258__delegate = function (_){
return cljs.core.not.call(null,checked_QMARK_);
};
var G__5258 = function (var_args){
var _ = null;
if (goog.isDef(var_args)) {
  _ = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__5258__delegate.call(this, _);
};
G__5258.cljs$lang$maxFixedArity = 0;
G__5258.cljs$lang$applyTo = (function (arglist__5259){
var _ = cljs.core.seq(arglist__5259);;
return G__5258__delegate(_);
});
G__5258.cljs$lang$arity$variadic = G__5258__delegate;
return G__5258;
})()
));
return tomatinho.core.update_goals.call(null);
});
tomatinho.core.parent = (function parent(node){
return goog.dom.getAncestor(node,cljs.core.identity);
});
goog.events.BrowserEvent.prototype.cljs$core$IEncodeClojure$ = true;
goog.events.BrowserEvent.prototype.cljs$core$IEncodeClojure$_js__GT_clj$arity$2 = (function (x,p__5264){
var map__5265 = p__5264;
var map__5265__$1 = ((cljs.core.seq_QMARK_.call(null,map__5265))?cljs.core.apply.call(null,cljs.core.hash_map,map__5265):map__5265);
var options = map__5265__$1;
var keywordize_keys = cljs.core._lookup.call(null,map__5265__$1,"\uFDD0'keywordize-keys",null);
var keyfn = (cljs.core.truth_(keywordize_keys)?cljs.core.keyword:cljs.core.str);
return cljs.core.zipmap.call(null,cljs.core.map.call(null,keyfn,goog.object.getKeys(x)),cljs.core.map.call(null,cljs.core._js__GT_clj,goog.object.getValues(x)));
});
goog.events.BrowserEvent.prototype.cljs$core$IEncodeClojure$_js__GT_clj$arity$1 = (function (x){
return cljs.core._js__GT_clj.call(null,x,cljs.core.ObjMap.fromObject(["\uFDD0'keywordize-keys"],{"\uFDD0'keywordize-keys":false}));
});
tomatinho.core.handle_plan_click = (function handle_plan_click(e,kind){
var event = cljs.core.js__GT_clj.call(null,e.evt);
var target = event.call(null,"target");
tomatinho.utils.log.call(null,event,target);
var temp__3971__auto__ = cljs.core.re_seq.call(null,/\w+/,target.id);
if(cljs.core.truth_(temp__3971__auto__))
{var vec__5270 = temp__3971__auto__;
var kind__$1 = cljs.core.nth.call(null,vec__5270,0,null);
var cetera = cljs.core.nthnext.call(null,vec__5270,1);
if(cljs.core._EQ_.call(null,kind__$1,"planned"))
{var planned = (new cljs.core.Keyword("\uFDD0'planned")).call(null,tomatinho.core.storage);
var pair = cljs.core.map.call(null,cljs.core.int$,cetera);
var exists_QMARK_ = tomatinho.utils.find_first.call(null,(function (p1__5260_SHARP_){
return cljs.core._EQ_.call(null,p1__5260_SHARP_,pair);
}),planned);
var vec__5271 = (cljs.core.truth_(exists_QMARK_)?cljs.core.PersistentVector.fromArray(["present","absent"], true):cljs.core.PersistentVector.fromArray(["absent","present"], true));
var old = cljs.core.nth.call(null,vec__5271,0,null);
var new$ = cljs.core.nth.call(null,vec__5271,1,null);
var G__5272_5274 = target;
domina.remove_class_BANG_.call(null,G__5272_5274,old);
domina.add_class_BANG_.call(null,G__5272_5274,new$);
return cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'planned",(cljs.core.truth_(exists_QMARK_)?cljs.core.disj:cljs.core.conj).call(null,planned,pair));
} else
{var vec__5273 = cetera;
var presence = cljs.core.nth.call(null,vec__5273,0,null);
var end = cljs.core.nth.call(null,vec__5273,1,null);
var end__$1 = cljs.core.int$.call(null,end);
var without = cljs.core.vec.call(null,cljs.core.filter.call(null,(function (p1__5261_SHARP_){
return cljs.core.not_EQ_.call(null,(new cljs.core.Keyword("\uFDD0'end")).call(null,p1__5261_SHARP_),end__$1);
}),(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage)));
if(cljs.core.truth_(tomatinho.utils.yes_or_no.call(null,"Are you sure you want to change the history?")))
{cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'history",((cljs.core._EQ_.call(null,presence,"present"))?without:cljs.core.sort.call(null,(function (p1__5262_SHARP_,p2__5263_SHARP_){
return ((new cljs.core.Keyword("\uFDD0'end")).call(null,p1__5262_SHARP_) < (new cljs.core.Keyword("\uFDD0'end")).call(null,p2__5263_SHARP_));
}),cljs.core.conj.call(null,without,cljs.core.ObjMap.fromObject(["\uFDD0'end","\uFDD0'duration","\uFDD0'kind"],{"\uFDD0'end":end__$1,"\uFDD0'duration":tomatinho.core.pomodoro_length,"\uFDD0'kind":"\uFDD0'pomodoro"})))));
tomatinho.core.update_resources.call(null);
return tomatinho.core.update_status.call(null);
} else
{return null;
}
}
} else
{return null;
}
});
tomatinho.core.handle_ok_click = (function handle_ok_click(e){
var name = domina.value.call(null,domina.css.sel.call(null,"#add-popup input"));
var date = goog.now();
var complete = null;
var id = cljs.core.deref.call(null,tomatinho.core.editanda);
var id__$1 = (function (){var or__3824__auto__ = id;
if(cljs.core.truth_(or__3824__auto__))
{return or__3824__auto__;
} else
{return [cljs.core.str(date),cljs.core.str("-"),cljs.core.str(name)].join('');
}
})();
var pretty = cljs.core.PersistentArrayMap.fromArrays([id__$1],[cljs.core.ObjMap.fromObject(["\uFDD0'name","\uFDD0'date","\uFDD0'complete"],{"\uFDD0'name":name,"\uFDD0'date":date,"\uFDD0'complete":complete})]);
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'goals",cljs.core.conj.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage),pretty));
tomatinho.jquery_mobile.close_popup.call(null,"#add-popup");
return tomatinho.core.update_goals.call(null);
});
tomatinho.core.handle_click = (function handle_click(){
tomatinho.core.inhibit_sleep.call(null);
if(cljs.core._EQ_.call(null,(new cljs.core.Keyword("\uFDD0'current")).call(null,tomatinho.core.storage),"\uFDD0'pause"))
{cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'current","\uFDD0'work");
} else
{cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'current","\uFDD0'pause");
}
cljs.core.reset_BANG_.call(null,tomatinho.core.timer_STAR_,0);
cljs.core.reset_BANG_.call(null,tomatinho.core.last_updated,cljs.core.zipmap.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'agenda","\uFDD0'pomodoro-list","\uFDD0'beep","\uFDD0'start-time"], true),cljs.core.repeat.call(null,goog.now())));
tomatinho.core.update_button.call(null);
return tomatinho.core.update_status.call(null);
});
tomatinho.core.handle_forgo_click = (function handle_forgo_click(e){
if(cljs.core.truth_(tomatinho.utils.yes_or_no.call(null,"Are you sure?")))
{cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'reflectanda",cljs.core.PersistentVector.EMPTY);
return tomatinho.core.update_reflectanda.call(null);
} else
{return null;
}
});
tomatinho.core.tick = (function tick(){
var now_object = tomatinho.utils.now.call(null);
var unix_now = now_object.getTime();
var seconds_to_now = (function (p1__5275_SHARP_){
return tomatinho.utils.ms__GT_s.call(null,(unix_now - p1__5275_SHARP_));
});
var map__5278 = cljs.core.deref.call(null,tomatinho.core.last_updated);
var map__5278__$1 = ((cljs.core.seq_QMARK_.call(null,map__5278))?cljs.core.apply.call(null,cljs.core.hash_map,map__5278):map__5278);
var lu = map__5278__$1;
var start_time = cljs.core._lookup.call(null,map__5278__$1,"\uFDD0'start-time",null);
var pomodoro_list = cljs.core._lookup.call(null,map__5278__$1,"\uFDD0'pomodoro-list",null);
var agenda = cljs.core._lookup.call(null,map__5278__$1,"\uFDD0'agenda",null);
var diff = tomatinho.utils.ms__GT_s.call(null,(unix_now - start_time));
var n = cljs.core.reset_BANG_.call(null,tomatinho.core.timer_STAR_,diff);
var cur = (new cljs.core.Keyword("\uFDD0'current")).call(null,tomatinho.core.storage);
var duration_ms = tomatinho.utils.s__GT_ms.call(null,n);
if((function (){var and__3822__auto__ = cljs.core._EQ_.call(null,cur,"\uFDD0'work");
if(and__3822__auto__)
{return (duration_ms >= tomatinho.core.pomodoro_length);
} else
{return and__3822__auto__;
}
})())
{cljs.core.reset_BANG_.call(null,tomatinho.core.timer_STAR_,0);
cljs.core.reset_BANG_.call(null,tomatinho.core.last_updated,cljs.core.assoc.call(null,lu,"\uFDD0'start-time",unix_now));
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'history",cljs.core.conj.call(null,(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage),cljs.core.ObjMap.fromObject(["\uFDD0'duration","\uFDD0'end","\uFDD0'kind"],{"\uFDD0'duration":duration_ms,"\uFDD0'end":now_object.getTime(),"\uFDD0'kind":"\uFDD0'pomodoro"})));
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'current","\uFDD0'pause");
} else
{}
tomatinho.core.update_button.call(null,n,cur,now_object);
if((seconds_to_now.call(null,pomodoro_list) > 30))
{cljs.core.reset_BANG_.call(null,tomatinho.core.last_updated,cljs.core.assoc.call(null,lu,"\uFDD0'pomodoro-list",unix_now));
tomatinho.core.update_status.call(null);
} else
{}
if(cljs.core.truth_((function (){var and__3822__auto__ = (function (){var or__3824__auto__ = cljs.core._EQ_.call(null,30,now_object.getMinutes());
if(or__3824__auto__)
{return or__3824__auto__;
} else
{return cljs.core._EQ_.call(null,0,now_object.getMinutes());
}
})();
if(cljs.core.truth_(and__3822__auto__))
{return (seconds_to_now.call(null,agenda) > 60);
} else
{return and__3822__auto__;
}
})()))
{cljs.core.reset_BANG_.call(null,tomatinho.core.last_updated,cljs.core.assoc.call(null,lu,"\uFDD0'agenda",unix_now));
tomatinho.core.update_resources.call(null);
} else
{}
if((seconds_to_now.call(null,(new cljs.core.Keyword("\uFDD0'beep")).call(null,lu)) > 60))
{cljs.core.reset_BANG_.call(null,tomatinho.core.last_updated,cljs.core.assoc.call(null,lu,"\uFDD0'beep",unix_now));
var G__5279 = (new cljs.core.Keyword("\uFDD0'notifications")).call(null,tomatinho.core.storage);
if(cljs.core._EQ_.call(null,"\uFDD0'noisy",G__5279))
{if(cljs.core._EQ_.call(null,"\uFDD0'work",cur))
{return tomatinho.core.vibrate.call(null);
} else
{var away = ((cljs.core.int$.call(null,((n / 60) / 5)) > 5) ? cljs.core.int$.call(null,((n / 60) / 5)) : 5);
tomatinho.core.vibrate.call(null);
return tomatinho.core.beep.call(null,away);
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'normal",G__5279))
{if(cljs.core._EQ_.call(null,"\uFDD0'work",cur))
{return tomatinho.core.vibrate.call(null,0.5);
} else
{tomatinho.core.vibrate.call(null,1);
return tomatinho.core.beep.call(null);
}
} else
{if(cljs.core._EQ_.call(null,"\uFDD0'quiet",G__5279))
{return tomatinho.utils.log.call(null,"so peaceful this message won't even show up");
} else
{if("\uFDD0'else")
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str((new cljs.core.Keyword("\uFDD0'notifications")).call(null,tomatinho.core.storage))].join('')));
} else
{return null;
}
}
}
}
} else
{return null;
}
});
goog.exportSymbol('tomatinho.core.tick', tomatinho.core.tick);
tomatinho.core.inhibit_sleep = (function() {
var inhibit_sleep = null;
var inhibit_sleep__0 = (function (){
return inhibit_sleep.call(null,tomatinho.core.pomodoro_length);
});
var inhibit_sleep__1 = (function (milis){
try{return cordova.exec((function (){
return tomatinho.utils.log.call(null,"lock acquired");
}),(function (){
return tomatinho.utils.log.call(null,"lock NOT acquired");
}),"KeepAwake","keep_awake",cljs.core.clj__GT_js.call(null,cljs.core.vector.call(null,[cljs.core.str(milis)].join(''))));
}catch (e5281){if(cljs.core.instance_QMARK_.call(null,Object,e5281))
{var e = e5281;
return null;
} else
{if("\uFDD0'else")
{throw e5281;
} else
{return null;
}
}
}});
inhibit_sleep = function(milis){
switch(arguments.length){
case 0:
return inhibit_sleep__0.call(this);
case 1:
return inhibit_sleep__1.call(this,milis);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
inhibit_sleep.cljs$lang$arity$0 = inhibit_sleep__0;
inhibit_sleep.cljs$lang$arity$1 = inhibit_sleep__1;
return inhibit_sleep;
})()
;
goog.exportSymbol('tomatinho.core.inhibit_sleep', tomatinho.core.inhibit_sleep);
tomatinho.core.reset = (function reset(){
if(cljs.core.truth_(tomatinho.utils.yes_or_no.call(null,"Really reset?")))
{cljs.core.reset_BANG_.call(null,tomatinho.core.timer_STAR_,0);
var G__5283_5284 = tomatinho.core.storage;
cljs.core.assoc_BANG_.call(null,G__5283_5284,"\uFDD0'current","\uFDD0'pause");
cljs.core.assoc_BANG_.call(null,G__5283_5284,"\uFDD0'history",cljs.core.PersistentVector.EMPTY);
cljs.core.assoc_BANG_.call(null,G__5283_5284,"\uFDD0'goals",cljs.core.ObjMap.EMPTY);
cljs.core.assoc_BANG_.call(null,G__5283_5284,"\uFDD0'planned",cljs.core.PersistentHashSet.EMPTY);
return tomatinho.core.update_all.call(null);
} else
{return null;
}
});
goog.exportSymbol('tomatinho.core.reset', tomatinho.core.reset);
tomatinho.core.archive = (function archive(feeling){
cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,"\uFDD0'reflectanda",cljs.core.conj.call(null,(new cljs.core.Keyword("\uFDD0'reflectanda")).call(null,tomatinho.core.storage),cljs.core.ObjMap.fromObject(["\uFDD0'date","\uFDD0'history","\uFDD0'feeling","\uFDD0'goals"],{"\uFDD0'date":tomatinho.utils.date_string.call(null,tomatinho.utils.now.call(null)),"\uFDD0'history":(new cljs.core.Keyword("\uFDD0'history")).call(null,tomatinho.core.storage),"\uFDD0'feeling":feeling,"\uFDD0'goals":cljs.core.vals.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage))})));
cljs.core.reset_BANG_.call(null,tomatinho.core.timer_STAR_,0);
var G__5289_5293 = tomatinho.core.storage;
cljs.core.assoc_BANG_.call(null,G__5289_5293,"\uFDD0'current","\uFDD0'pause");
cljs.core.assoc_BANG_.call(null,G__5289_5293,"\uFDD0'history",cljs.core.PersistentVector.EMPTY);
cljs.core.assoc_BANG_.call(null,G__5289_5293,"\uFDD0'goals",cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.filter.call(null,(function (p__5290){
var vec__5291 = p__5290;
var _ = cljs.core.nth.call(null,vec__5291,0,null);
var map__5292 = cljs.core.nth.call(null,vec__5291,1,null);
var map__5292__$1 = ((cljs.core.seq_QMARK_.call(null,map__5292))?cljs.core.apply.call(null,cljs.core.hash_map,map__5292):map__5292);
var complete = cljs.core._lookup.call(null,map__5292__$1,"\uFDD0'complete",null);
return cljs.core.not.call(null,complete);
}),(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage))));
cljs.core.assoc_BANG_.call(null,G__5289_5293,"\uFDD0'planned",cljs.core.PersistentHashSet.EMPTY);
return tomatinho.core.update_all.call(null);
});
goog.exportSymbol('tomatinho.core.archive', tomatinho.core.archive);
tomatinho.utils.log.call(null,cljs.core.into.call(null,cljs.core.ObjMap.EMPTY,cljs.core.filter.call(null,(function (p__5294){
var vec__5295 = p__5294;
var _ = cljs.core.nth.call(null,vec__5295,0,null);
var map__5296 = cljs.core.nth.call(null,vec__5295,1,null);
var map__5296__$1 = ((cljs.core.seq_QMARK_.call(null,map__5296))?cljs.core.apply.call(null,cljs.core.hash_map,map__5296):map__5296);
var complete = cljs.core._lookup.call(null,map__5296__$1,"\uFDD0'complete",null);
return complete;
}),cljs.core.vec.call(null,(new cljs.core.Keyword("\uFDD0'goals")).call(null,tomatinho.core.storage)))));
tomatinho.core.init = (function init(){
tomatinho.jquery_mobile.swipe_between_pages.call(null);
tomatinho.jquery_mobile.animate_navbar.call(null);
var G__5300_5303 = cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray(["\uFDD0'current","\uFDD0'pause"], true),cljs.core.PersistentVector.fromArray(["\uFDD0'history",cljs.core.PersistentVector.EMPTY], true),cljs.core.PersistentVector.fromArray(["\uFDD0'goals",cljs.core.ObjMap.EMPTY], true),cljs.core.PersistentVector.fromArray(["\uFDD0'planned",cljs.core.PersistentHashSet.EMPTY], true),cljs.core.PersistentVector.fromArray(["\uFDD0'day-start",8], true),cljs.core.PersistentVector.fromArray(["\uFDD0'day-end",23], true),cljs.core.PersistentVector.fromArray(["\uFDD0'notifications","\uFDD0'normal"], true),cljs.core.PersistentVector.fromArray(["\uFDD0'refletanda",cljs.core.PersistentVector.EMPTY], true)], true));
while(true){
if(G__5300_5303)
{var vec__5301_5304 = cljs.core.first.call(null,G__5300_5303);
var k_5305 = cljs.core.nth.call(null,vec__5301_5304,0,null);
var v_5306 = cljs.core.nth.call(null,vec__5301_5304,1,null);
if(cljs.core.not.call(null,cljs.core._lookup.call(null,tomatinho.core.storage,k_5305,null)))
{cljs.core.assoc_BANG_.call(null,tomatinho.core.storage,k_5305,v_5306);
} else
{}
{
var G__5307 = cljs.core.next.call(null,G__5300_5303);
G__5300_5303 = G__5307;
continue;
}
} else
{}
break;
}
var G__5302_5308 = tomatinho.core.storage;
cljs.core.assoc_BANG_.call(null,G__5302_5308,"\uFDD0'current","\uFDD0'pause");
cljs.core.reset_BANG_.call(null,tomatinho.core.last_updated,cljs.core.zipmap.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'agenda","\uFDD0'pomodoro-list","\uFDD0'beep","\uFDD0'start-time"], true),cljs.core.repeat.call(null,goog.now())));
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#current-time"),"\uFDD0'click",tomatinho.core.handle_click);
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,".simple-list"),"\uFDD0'click",tomatinho.core.create_goals_popup);
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#resources"),"\uFDD0'click",tomatinho.core.create_range_popup);
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#forgo-reviews"),"\uFDD0'click",tomatinho.core.handle_forgo_click);
domina.events.listen_BANG_.call(null,domina.css.sel.call(null,"#forgo-reviews"),"\uFDD0'click",tomatinho.core.handle_forgo_click);
return tomatinho.core.update_all.call(null);
});
goog.exportSymbol('tomatinho.core.init', tomatinho.core.init);
tomatinho.core.init.call(null);
